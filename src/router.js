import React, { Component } from 'react'
import { withRouter, HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoadableComponent from './utils/LoadableComponent'
import PrivateRoute from './components/Function/PrivateRoute'

//参数一定要是函数，否则不会懒加载，只会代码拆分
const Home = LoadableComponent(()=>import('./pages/Home'))
const Error = LoadableComponent(()=>import('./pages/Error'))
//const Staff = LoadableComponent(()=>import('./pages/Staff'))
const StaffList = LoadableComponent(()=>import('./pages/StaffList'))
const Suggestion = LoadableComponent(()=>import('./pages/Suggestion'))
const MyTable = LoadableComponent(()=>import('./components/UI/MyTable'))

@withRouter
class Router extends Component {
    render(){
        return (
            <Switch>
                <Redirect exact from='/' to='/admin/home'/>
                <Route exact path="/admin/home" component={Home}/>
                <Route exact path="/admin/user/suggestion" component={Suggestion}></Route>
                <Route exact path="/admin/staff/staffinfo" component={StaffList} />
                {/* <Route exact path="/admin/staff/staffinfo" component={Staff} /> */}
                <Route exact component={Error} />
            </Switch>
        );
    }
}

export default Router;