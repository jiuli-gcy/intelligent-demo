import React, { Component } from 'react'
import { Card, Empty, Row, Col, BackTop, Icon } from 'antd'
import '../../styles/App.css'

import ReactEcharts from 'echarts-for-react';
//import echarts from 'echarts/lib/echarts';
// 引入柱状图
// import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/toolbox'
const { Meta } = Card;



class Home extends Component {
    state = {
        daily: -11,
        weekly: 12
    }
    getOption() {
        let option = {
            backgroundColor: "#fff",
            color: ['rgb(216, 151, 235)', 'rgb(246, 152, 153)', 'rgb(100, 234, 145)'],
            title: [{
                text: '景区收入/千元',
                left: '2%',
                top: '6%',
                textStyle: {
                    fontWeight: 'normal',
                },
            }],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                width: '90%',
            },
            legend: {
                //x: 300,
                top: '7%',
                right: '3%',
                textStyle: {
                    color: 'gray',
                },
                data: ['网购', '线下', '其他']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: 'lightgray',
                    },
                },
                axisLabel: {
                    color: 'gray'
                },
                data: ['2月', '3月', '4月', '5月', '6月', '7月', '8月']
            },
            yAxis: {
                min: 0,
                max: 100,
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'lightgray',
                    },
                },
                axisLabel: {
                    color: 'gray'
                },
            },
            series: [{
                name: '网购',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [10, 40, 32, 20, 80, 90, 97]
            }, {
                name: '线下',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [70, 50, 50, 87, 90, 80, 70]
            }, {
                name: '其他',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [30, 40, 10, 20, 33, 66, 54]
            }]
        };
        return option;
    }
    //查看反馈信息的跳转
    gotoSuggestion = () => {
        this.props.history.push({
            pathname: '/admin/user/suggestion'
        });
    }
    render() {
        const { daily, weekly } = this.state;
        return (
            <div id="cards" style={{ height: '100%', padding: '15px' }}>
                <Row gutter={6}>
                    <Col span={6}>
                        <Card className='card-item' style={{ height: '157.8px' }}>
                            <div className='chartCard'>
                                <div className='chartTop'>
                                    <div className='metaWrap'>
                                        <div className='meta'>
                                            <span>总销售额</span>
                                            <span className='action'>
                                                <Icon className='info-circle' type="exclamation-circle" />
                                            </span>
                                        </div>
                                        <div className='total'>
                                            <h1>¥ 126,560</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='content' style={{ height: '30px' }}>
                                    <div className='contentFixed'>
                                        <div className='trendItem' title='' style={{ marginRight: '16px' }}>
                                            <span>周同比
                                                <span className='trendText'>{weekly}%</span>
                                            </span>
                                            <span className='weekly'>
                                                {weekly > 0 ?
                                                    <Icon type="caret-up" /> :
                                                    <Icon type="caret-down" />}
                                            </span>
                                        </div>
                                        <div className='trendItem'>
                                            <span>日同比
                                                <span className='trendText'>{daily}%</span>
                                            </span>
                                            <span className='daily'>
                                                {daily > 0 ?
                                                    <Icon type="caret-up" /> :
                                                    <Icon type="caret-down" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-item' style={{ height: '157.8px' }}>
                            <div className='chartCard'>
                                <div className='chartTop'>
                                    <div className='avatar'>

                                    </div>
                                    <div className='metaWrap'>
                                        <div className='meta'>
                                            <span>人流量</span>
                                            <span className='action'>
                                                <Icon className='info-circle' type="exclamation-circle" />
                                            </span>
                                        </div>
                                        <div className='total'>
                                            <h1><Icon type="team" /> 12,656</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='content' style={{ height: '30px' }}>
                                    <div className='contentFixed'>
                                        <div className='trendItem' title='' style={{ marginRight: '16px' }}>
                                            <span>周同比
                                                <span className='trendText'>{weekly}%</span>
                                            </span>
                                            <span className='weekly'>
                                                {weekly > 0 ?
                                                    <Icon type="caret-up" /> :
                                                    <Icon type="caret-down" />}
                                            </span>
                                        </div>
                                        <div className='trendItem'>
                                            <span>日同比
                                                <span className='trendText'>{daily}%</span>
                                            </span>
                                            <span className='daily'>
                                                {daily > 0 ?
                                                    <Icon type="caret-up" /> :
                                                    <Icon type="caret-down" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            actions={[<Icon type="info-circle-o" />,
                            <Icon type="arrow-right" onClick={() => this.gotoSuggestion()} />]}>
                            <Meta
                                style={{ fontSize: 22 }}
                                avatar={<img src={require('../../assets/img/mail.png')}
                                    alt="" />}
                                title='未读信息'
                                description={2}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            actions={[<Icon type="info-circle-o" />, <Icon type="arrow-right" />]}>
                            <Meta
                                style={{ fontSize: 22 }}
                                avatar={<img src={require('../../assets/img/cart.png')} alt="" />}
                                title='待发货'
                                description="-"
                            />
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row gutter={16}>
                    <Col md={16}>
                        <Card
                            style={{ marginBottom: 16 }}
                            bodyStyle={{ padding: 0, height: '277px', overflow: 'hidden' }}>
                            <ReactEcharts
                                option={this.getOption()}
                            />
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card  className='card-item'
                            style={{ marginBottom: 16 }}
                            bodyStyle={{ padding: 0, height: '277px', overflow: 'hidden' }}>
                            <div className='total'>
                                <Icon type="solution" /> 我的待办
                            </div>
                                <Empty />
                            </Card>
                    </Col>
                </Row>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default Home