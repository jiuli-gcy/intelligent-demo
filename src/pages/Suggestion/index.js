import React, { Component } from 'react'
import { Card, Avatar, Row, Col, Button, BackTop, Collapse, Table, Icon } from "antd";

const columns = [
    { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left', align: 'center' },
    { title: '状态', width: 80, dataIndex: 'state', key: 'state', fixed: 'left', align: 'center' },
    { title: '留言', width: 600, dataIndex: 'written', key: 'written', className: 'column-written' },
    { title: '邮箱', width: 200, dataIndex: 'mail', key: 'mail', fixed: 'right', align: 'center' },
    { title: '时间', width: 180, dataIndex: 'time', key: 'time', fixed: 'right', align: 'center' },
    {
        title: '操作', width: 100, key: 'operation', fixed: 'right', align: 'center',
        render: (record) => <Button type="link" >查看详情</Button>,
    }
];
const data = [{
    key: '1',
    name: '简丽',
    state: <Icon type="exclamation" style={{ color: 'red' }} />,
    written: '景区厕所没纸了！',
    mail: 'marinus.jagesar@example.com',
    time: '2020-08-01 19:55:21',
}, {
    key: '2',
    name: '高达',
    state: <Icon type="exclamation" style={{ color: 'red' }} />,
    written: '商城快递问题',
    mail: 'zachary.lavigne@example.com',
    time: '2020-08-08 19:22:13',
}, {
    key: '3',
    name: '白飞飞',
    state: <Icon type="check" style={{ color: 'gray' }} />,
    written: '售票员态度差，问个问题爱理不理的，是没收到工资吗？差评',
    mail: 'levi.willis@example.com',
    time: '2020-08-08 18:11:01',
}, {
    key: '4',
    name: '朱七七',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '带孩子来的，孩子很喜欢，下次还来',
    mail: 'tobias.pedersen@example.com',
    time: '2020-08-08 16:03:59',
}, {
    key: '5',
    name: '张飞',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '景区服务很好',
    mail: 'samuel.leon@example.com',
    time: '2020-08-08 13:43:33',
}, {
    key: '6',
    name: '李达康',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '景区盒饭不好吃又贵',
    mail: 'dakang@example.com',
    time: '2020-08-08 12:43:33',
}, {
    key: '7',
    name: '马冬梅',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '商城东西也忒少了，希望各个分类下都有东西卖，想给朋友带点特产结果也没什么好带的',
    mail: 'dongmei@example.com',
    time: '2020-08-08 10:43:33',
}, {
    key: '8',
    name: '展昭',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '景区卫生比较好，感觉游览的过程非常舒适，给景区卫生员点赞！',
    mail: 'zhanzhao@example.com',
    time: '2020-08-08 10:33:33',
}, {
    key: '9',
    name: '范闲',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '早上人比较少，希望能热情一点',
    mail: 'fanxian@example.com',
    time: '2020-08-08 08:43:33',
}, {
    key: '10',
    name: '范仲淹',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '游玩此地诗兴大发，赋诗一首',
    mail: 'lalalaa@example.com',
    time: '2020-08-07 18:43:33',
}, {
    key: '11',
    name: '焦俊艳',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '商城的小东西都很有趣哦，希望有更多的原创商品呢，支持~',
    mail: 'jiaojiao@example.com',
    time: '2020-08-07 14:43:33',
}, {
    key: '12',
    name: '白敬亭',
    state: <Icon type="check" style={{ color: 'green' }} />,
    written: '景区负责人非常敬业，丢失东西帮忙紧急寻找，感谢',
    mail: 'example@example.com',
    time: '2020-08-06 17:23:33',
}];

export default class Suggestion extends Component {
    render() {
        return (
            <div id="cards" style={{ padding: '15px' }}>
                <Row gutter={6}>
                    <Col span={24}>
                        <Card title="游客反馈">
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={{defaultPageSize:6}}
                            />
                        </Card>
                    </Col>
                </Row>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}
