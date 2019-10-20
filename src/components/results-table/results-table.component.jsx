import React from 'react';

import { firestore } from '../../firebase/firebase.utils';

import { Table, TableHeader, TableRow, TableCell } from './results-table.style'

import state from './dummy-data'

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "users": [],
      "matches": []
    }
  }
  componentDidMount() {
    try {
      let allUsers = []
      let allMatches = []
      firestore.collection("users").get().then(users =>{ 
        users.forEach(user => {          
          let userObj = user.data()
          userObj.id = user.id         
          allUsers.push(userObj)}
        )
        this.setState({
          "users": allUsers
        })
      })
      firestore.collection("matches").get().then(matches =>{ 
        matches.forEach(match => {
          let matchObj = match.data()
          matchObj.id = match.id
          allMatches.push(matchObj)
        }
        )
        this.setState({
          "matches": allMatches
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

    generateHeaders = (matches) =>{            
      const headerMatches = matches.map(match =>{
        return (<TableHeader key={match.id}> {match.team1} vs {match.team2} </TableHeader>)
      })
      const headerNames =  (<TableHeader key = "names"> Name </TableHeader>)
      const headerPoints =  (<TableHeader key = "points"> Points </TableHeader>)

      return [headerNames ,headerMatches, headerPoints]
    }

    generateBody = (users) =>{      
      const generateUserPredictionCells = user => {
        const userPredictions = user.predictions.map(prediction => {
          return (<TableCell key={`${user.id}${prediction.matchId}`}>{prediction.prediction[0]}- {prediction.prediction[1]}</TableCell>)
      })
      return userPredictions
      } 
      const rows = users.map(user =>{
        return (
          <TableRow key={user.id}>           
          <TableCell>{user.displayName}</TableCell>
          {generateUserPredictionCells(user)}
          <TableCell>{user.points}</TableCell>
          </TableRow>
        )
      })
      
      return [rows]
    }

  render() {
    if(this.state.users.length === 0 || this.state.matches.length === 0){
      return <div> Loading </div>
    } else {
      console.log(this.state);
      return (
        
        <Table >
          <thead>
          <TableRow>
            {this.generateHeaders(this.state.matches)}
          </TableRow>
          </thead>
          <tbody>
            {this.generateBody(this.state.users)}
          </tbody>

        </Table>
      );
    }
  }
}

export default ResultsTable;