import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import './App.css';
import PrivateRoute from './components/Function/PrivateRoute'
import Admin from './admin'
import Login from './pages/Login'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/' component={Admin}/>
      </Switch>
    )
  }
}

// export default class App extends Component {
//   render() {
//     return (
//       <div >
//       {this.props.children}
//     </div>
//     )
//   }
// }
