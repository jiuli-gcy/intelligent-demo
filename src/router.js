import React, { Component } from 'react'
import { withRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoadableComponent from './utils/LoadableComponent'

//参数一定要是函数，否则不会懒加载，只会代码拆分
const Home = LoadableComponent(()=>import('./pages/Home'))
const Error = LoadableComponent(()=>import('./pages/Error'))
//const Staff = LoadableComponent(()=>import('./pages/Staff'))
const StaffList = LoadableComponent(()=>import('./pages/StaffList'))
const UserList = LoadableComponent(()=>import('./pages/UserList'))
const Suggestion = LoadableComponent(()=>import('./pages/Suggestion'))
const Area = LoadableComponent(()=>import('./pages/Area'))
const Facilities = LoadableComponent(()=>import('./pages/Facilities'))
const Line = LoadableComponent(()=>import('./pages/Line'))
const News = LoadableComponent(()=>import('./pages/News'))
// const Permission = LoadableComponent(()=>import('./pages/Permission'))

@withRouter
class Router extends Component {
    render(){
        return (
            <Switch>
                <Redirect exact from='/' to='/admin/home'/>
                <Route exact path="/admin/home" component={Home}/>
                <Route exact path="/admin/user/suggestion" component={Suggestion}></Route>
                <Route exact path="/admin/staff/staffinfo" component={StaffList} />
                <Route exact path="/admin/user/userinfo" component={UserList} />
                <Route exact path="/admin/area/spot" component={Area} />
                <Route exact path="/admin/news" component={News} />
                <Route exact path="/admin/area/facility" component={Facilities} />
                <Route exact path="/admin/area/line" component={Line} />
                {/* <Route exact path="/admin/staff/permission" component={News} /> */}
                {/* <Route exact path="/admin/staff/staffinfo" component={Staff} /> */}
                <Route exact component={Error} />
            </Switch>
        );
    }
}

export default Router;