import React from 'react';
import {connect } from 'react-redux'
import {firestore} from '../../firebase/firebase.utils'

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { SignUpContainer, SignUpTitle } from './profile.styles';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      bio: "",
    };
  }
  componentDidMount() {
      this.setState({
        displayName: this.props.currentUser.displayName,
        bio: this.props.currentUser.bio
      })
  }

  handleChange = event => {
    console.log(this.props);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, bio } = this.state;
    const { id } = this.props.currentUser

    try {
      await firestore.collection("users").doc( id ).update({
        displayName,
        bio
      }).then(res => console.log(res))
    } catch (error) {
      console.log(error);
    }
  };

  render(){
    const { displayName, bio } = this.state;
    return (
      <SignUpContainer>
        <SignUpTitle>Your Profile</SignUpTitle>
        <span> Feel free to update any of your information :)</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={ displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
        <FormInput
            type='text'
            name='bio'
            value={ bio}
            onChange={this.handleChange}
            label='Bio'
            required
          />
          <CustomButton type='submit'>SAVE CHANGES</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}

const mapStateToProps = ({ user }) =>({
  currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(ProfilePage);