import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd';

// const pickStatus = fStatus => {
//     if (fStatus === '正常') return "暂停使用";
//     if (fStatus === '暂停使用') return "开始使用";
//     if (fStatus === '维护中') return "结束维护";
//     return "暂停使用";
// };

class AreaTable extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const { editClick, dataSource } = this.props;
        //console.log('props:', this.props);
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '状态',
                dataIndex: 'fStatus',
                key: 'fStatus',
            },
            {
                title: '坐标',
                dataIndex: 'coordinate',
                key: 'coordinate',
            },
            {
                title: '标签',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 2 ? 'geekblue' : 'volcano';
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
                render: (text, record, index) => (
                    <span>
                        {/* <a>{pickStatus(record.fStatus)}</a>
                        <Divider type="vertical" /> */}
                        <Button type="link" onClick={() => editClick(record.id, index)}>编辑</Button>
                    </span>
                ),
            },
        ];

        return (
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 8 }}
                className="formTable"
            />
        )
    }
}

export default AreaTable