import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Login from './pages/Login'
import Error from './pages/Error'
import Home from './pages/Home'
import Staff from './pages/Staff'

export default class Router extends Component {
    render(){
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/error" component={Error}/>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/staff" component={Staff} />
                                <Route component={Error}/>
                            </Switch>
                        </Admin>
                    }/>
                </App>
            </HashRouter>
        );
    }
}