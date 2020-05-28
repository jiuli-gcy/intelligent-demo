import React, { Component } from 'react'
import { Card, Table, Divider, Tag, Button } from 'antd'
const pickStatus = fStatus => {
  if (fStatus === '正常') return "暂停使用";
  if (fStatus === '暂停使用') return "开始使用";
  if (fStatus === '维护中') return "结束维护";
  return "暂停使用";
};
export default class Facilities extends Component {
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="/#">{text}</a>,
      },
      {
        title: '状态',
        dataIndex: 'fStatus',
        key: 'fStatus',
      },
      {
        title: '景区',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'volcano';
              if (tag === '绿化') {
                color = 'green';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="/#">{pickStatus(record.fStatus)}</a>
            <Divider type="vertical" />
            <a href="/#">编辑</a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: '情人坡草坪',
        hot: 32,
        fStatus: '正常',
        address: '情人坡',
        tags: ['休闲', '绿化'],
      },
      {
        key: '2',
        name: '北秀超市',
        hot: 42,
        fStatus: '维护中',
        address: '北秀楼',
        tags: ['商超设施'],
      }
    ];
    return (
      <div id="cards" style={{ padding: '15px' }}>
        <Card title="设施管理" extra={<Button type="primary" >添加设施</Button>} >
          <div>共2个设施</div>
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    );
  }
}
