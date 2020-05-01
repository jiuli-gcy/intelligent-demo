import React from 'react'
import { Row, Col } from "antd"
//import {formateDate} from '../../../../utils/formateDate'
import moment from 'moment'
import axios from '../../../../utils/axios'
import './index.css'

class NavTop extends React.Component {
    componentWillMount() {
        this.setState({
            userName: 'Jiuli',
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
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
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