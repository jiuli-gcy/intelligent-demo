import React, { Component } from 'react'
import { Card, Table, Divider, Tag, Button } from 'antd'
const { CheckableTag } = Tag;
const tagsFromServer = ['休闲', '餐饮', '亲子'];
export default class Area extends Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="/#">{text}</a>,
      },
      {
        title: '权重',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '游览路线',
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
        render: (text, record, status) => (
          <span>
            {status === '关闭' ?
              <a href="/#">编辑线路</a> : <a href="/#">暂停使用</a>}
            <Divider type="vertical" />
            <a href="/#">编辑</a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: '绿地漫步',
        hot: 32,
        status: '1',
        address: '情人坡-陈家河-小树林',
        tags: ['休闲', '绿化'],
      },
      {
        key: '2',
        name: '风情小吃',
        hot: 42,
        status: '2',
        address: '北秀楼-工程师餐厅',
        tags: ['餐饮','休闲','亲子'],
      }
    ];
    const { selectedTags } = this.state;
    return (
      <div id="cards" style={{ padding: '15px' }}>
        <Card title="线路管理" extra={<Button type="primary" >添加线路</Button>} >
          <div>共2条游览线路</div>
          <span style={{ marginRight: 8 }}>线路筛选:</span>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    );
  }
}
