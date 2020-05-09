import React, { Component } from 'react'
import { withRouter, HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoadableComponent from './utils/LoadableComponent'
import PrivateRoute from './components/Function/PrivateRoute'

//参数一定要是函数，否则不会懒加载，只会代码拆分
const Home = LoadableComponent(()=>import('./pages/Home'))
const Error = LoadableComponent(()=>import('./pages/Error'))
const Staff = LoadableComponent(()=>import('./pages/Staff'))

@withRouter
class Router extends Component {
    render(){
        return (
            <Switch>
                <Redirect exact from='/' to='/admin/home'/>
                <Route exact path="/admin/home" component={Home}/>
                <Route exact path="/admin/staff/staffinfo" component={Staff} />
                <Route exact exact from='/' to='/admin/home'/>
                <Route exact component={Error} />
            </Switch>
        );
    }
}

export default Router;