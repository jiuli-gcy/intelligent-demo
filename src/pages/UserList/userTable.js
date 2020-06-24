import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';

class UserTable extends Component {
    constructor(props) {
        super(props);
    }
    handleDelete(record){
        this.props.appStore.handleDelete(record);
    }
    render() {
        const { dataSource } = this.props;
        console.log('2props:', this.props);
        let columns = [{
            title: '用户名',
            dataIndex: 'userName',
            width: 80,
            editable: false,
        }, {
            title: '邮箱',
            dataIndex: 'userEmail',
            width: 80,
            editable: false,
        }, {
            title: '微信',
            dataIndex: 'userWechat',
            width: 100,
            editable: false,
        }, {
            title: '联系电话',
            dataIndex: 'userTel',
            width: 100,
            editable: true,
        // }, {
        //     title: '操作',
        //     dataIndex: 'opera',
        //     key: 'opera',
        //     width: 100,
        //     align: 'center',
        //     render: (text, record, index) =>
        //             <div className="opera">
        //             <Tooltip title="删除记录">
        //                     <span style={{ fontSize: '18px', margin: '5px' }} onClick={() => this.onDelete(record)}>
        //                         <Icon type="user-delete" />
        //                     </span>
        //                 </Tooltip>
        //             </div>
        }
    ];

        return (
            <Table
                rowKey={record => record.key}
                columns={columns}
                dataSource={dataSource}
                bordered
                pagination={{ pageSize: 6 }}
                className="formTable"
                //loading={loading}
            />
        )
    }
}

export default UserTable