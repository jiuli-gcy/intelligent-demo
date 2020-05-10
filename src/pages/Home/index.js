import React, { Component } from 'react'
import { Card, Row, Col, BackTop, Icon } from 'antd'
import '../../styles/App.css'
const { Meta } = Card;

class Home extends Component {
    state = {
        daily: -11,
        weekly: 12
    }
    render() {
        const{daily,weekly} = this.state;
        return (
            <div id="cards" style={{ height: '100%', padding: '15px' }}>
                <Row gutter={6}>
                    <Col span={8}>
                        <Card className='card-item' style={{ padding: '20px 24px 8px' }}>
                            <div className='chartCard'>
                                <div className='chartTop'>
                                    <div className='avatar'>

                                    </div>
                                    <div className='metaWrap'>
                                        <div className='meta'>
                                            <span>总销售额</span>
                                            <span className='action'>
                                                <span className='info-circle'>
                                                    <svg viewBox='64 64 896 896' focusable='false' className='' data-icon='info-circle' width='1em' height='1em'>
                                                        <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'></path>
                                                        <path d='M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z'></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </div>
                                        <div className='total'>
                                            <h1>¥ 126,560</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='content' style={{ height: '46px' }}>
                                    <div className='contentFixed'>
                                        <div className='trendItem' title='' style={{ marginRight: '16px' }}>
                                            <span>周同比
                                                <span className='trendText'>{weekly}%</span>
                                            </span>
                                            <span className='weekly'>
                                                {weekly>0?
                                                    <Icon type="caret-up" />:
                                                    <Icon type="caret-down" />}
                                            </span>
                                        </div>
                                        <div className='trendItem'>
                                            <span>日同比
                                                <span className='trendText'>{daily}%</span>
                                            </span>
                                            <span className='daily'>
                                                {daily>0?
                                                    <Icon type="caret-up" />:
                                                    <Icon type="caret-down" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='footer'>
                                    <div className='field'>
                                        <span className='label'>
                                            日销售额
                                        </span>
                                        <span className='number'>
                                            ￥12,423
                            </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title='气泡图' className='card-item'>
                            这是气泡图
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title='气泡图' className='card-item'>
                            这是气泡图
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title='气泡图' className='card-item'>
                            这是气泡图
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='气泡图' className='card-item'>
                            这是气泡图
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home