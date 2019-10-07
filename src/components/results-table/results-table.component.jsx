import React from 'react';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { Table, TableHeader, TableRow, TableCell } from './results-table.style'

import state from './dummy-data'

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = state
  }

    generateHeaders = (matches) =>{            
      const headerMatches = matches.map(match =>{
        return (<TableHeader key={match.id}> {match.team_1} vs {match.team_2} </TableHeader>)
      })
      const headerNames =  (<TableHeader key = "names"> Name </TableHeader>)
      const headerPoints =  (<TableHeader key = "points"> Points </TableHeader>)

      return [headerNames ,headerMatches, headerPoints]
    }

    generateBody = (users) =>{
      console.log(users);
      
      const generateUserPredictionCells = predictions => {
        const userPredictions = predictions.map(prediction => {
          return (<TableCell key={prediction.game_id}>{prediction.prediction[0]}- {prediction.prediction[1]}</TableCell>)
      })
      return userPredictions
      } 
      const rows = users.map(user =>{
        return (
          <TableRow key={user.id}>           
          <TableCell>{user.name}</TableCell>
          {generateUserPredictionCells(user.predictions)}
          <TableCell>{user.points}</TableCell>
          </TableRow>
        )
      })
      
      return [rows]
    }

  


  componentDidMount() { 
  }

  render() {
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

export default ResultsTable;