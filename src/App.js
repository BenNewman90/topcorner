import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect } from 'react-redux'
import './App.css';


import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions'

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Profile from './pages/profile/profile.component';
import EditProfile from './pages/profile-edit/profile-edit.component';
import MyPredictions from './pages/my-predicitions/my-predicitions.component'
import Results from './pages/results/results.component'


class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot(snapshot => {
            this.props.setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            }, () =>{
              console.log(this.state);
            })
        })
        
      }
      setCurrentUser(userAuth)
    })

  }


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route 
            exact 
            path='/profile' 
            render={() =>
              !this.props.currentUser ? (
                <Redirect to='/v' />
              ) : (
                <Profile />
              )
            }
          />
          <Route exact path='/edit-profile' component={EditProfile} />
          <Route 
            exact 
            path='/my-predictions'            
            render={() =>
              !this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <MyPredictions />
              )
            }
          />
          <Route exact path='/results' component={Results} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) =>({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);