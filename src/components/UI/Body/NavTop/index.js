import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Row, Col } from "antd"
//import {formateDate} from '../../../../utils/formateDate'
import moment from 'moment'
import axios from '../../../../utils/axios'
import { isAuthenticated } from '../../../../utils/Session'
import './index.css'

//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter @inject('appStore') @observer
class NavTop extends Component {
    UNSAFE_componentWillMount() {
        this.setState({
            userName: 'Admin',
            sysTime: moment().format('YYYY-MM-DD')
        })
        this.getWeatherAPIData();
    }
    getWeatherAPIData() {//百度地图api
        //let city = 'hangzhou';
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=hangzhou&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            //console.log(res)
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }
    logout = () => {
        this.props.appStore.toggleLogin(false)
        this.props.history.push(this.props.location.pathname)
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎， {isAuthenticated()}</span>
                        <a href="/#" onClick={this.logout}>退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">
                            {this.state.sysTime}
                        </span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt="" />
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default NavTop;