import React, { Component } from 'react';
import { Table, Icon, Tooltip } from 'antd';

class StaffTable extends Component {
    render() {
        const { onDelete, editClick, dataSource } = this.props;
        console.log('2props:', this.props);
        let columns = [{
            title: '姓名',
            dataIndex: 'staffName',
            width: 80,
            editable: false,
        }, {
            title: '工号',
            dataIndex: 'staffId',
            sorter: (a, b) => a.staffId - b.staffId,
            width: 80,
            editable: false,
        }, {
            title: '性别',
            dataIndex: 'staffSex',
            width: 80,
            editable: true,
        }, {
            title: '部门',
            dataIndex: 'department',
            width: 180,
            editable: true,
        }, {
            title: '联系方式',
            dataIndex: 'staffTel',
            width: 90,
            editable: true,
        }, {
            title: '级别',
            dataIndex: 'staffLevel',
            width: 80,
            editable: false,
        }, {
            title: '操作',
            dataIndex: 'opera',
            key: 'opera',
            width: 100,
            align: 'center',
            render: (text, record, index) =>
                    <div className="opera">
                        <Tooltip title="编辑">
                            <span style={{ fontSize: '18px', margin: '5px' }} onClick={() => editClick(record.key, index)}>
                                <Icon type="edit" />
                            </span>
                        </Tooltip>
                        |
                    <Tooltip title="移除">
                            <span style={{ fontSize: '18px', margin: '5px' }} onClick={() => onDelete(record.key)}>
                                <Icon type="user-delete" />
                            </span>
                        </Tooltip>
                    </div>
        }];

        // if (!authority.includes('Project_RW') && !status.includes('完成')) {
        //     columns = columns.filter((val, index) => {
        //         return val.key === 'opera' ? false : true;
        //     });
        // }
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

export default StaffTable