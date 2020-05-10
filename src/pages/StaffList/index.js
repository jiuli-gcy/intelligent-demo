import React, { Component } from 'react';
import { Row, Col, Input, Icon, Select, Button, BackTop, Card } from 'antd';
//import style from './member.module.scss';
import moment from 'moment';
//import http from 'utils/http';
//import { releaseMember, updateMember, addMember, listMemberJob } from 'api/member';
//import MemberEditForm from './memberEditForm';
//import PMOReleaseForm from './PMORelease';
//import { MemberAddForm, MemberApplyForm, MemberReleaseForm } from 'components';

import StaffTable from './staffTable';
import ButtonGroup from 'antd/lib/button/button-group';

const { Search } = Input;
const InputGroup = Input.Group;
const options = [];
const { Option } = Select;

//找到对应元素的索引
// function catchIndex(arr, key){ //获取INDEX
//     arr.map(function (ar, index) {
//         if(ar.key === key){
//             return index;
//         }
//     });
//     return 0;
// }
//替换数组的对应项
// function replace(arr, item, place) { //arr 数组,item 数组其中一项, place 替换项
//     arr.map(function (ar) {
//         if (ar.id === item) {
//             arr.splice(arr.indexOf(ar), 1, place);
//         }
//     });
//     return arr;
// }
//const getMembers = (url, params) => http.get(url, params);

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            //url: `/member/listMember?projectId=${this.props.projid}`,
            searchName: '',
            searchDepartment: undefined,
            //editvisible: false, //编辑窗口
            //visible: false, //添加窗口
            //appvisible: false, //申请窗口
            //releaseVisible: false,//释放申请窗口
            dataSource: [],
            showData: [],
            tableRowKey: 0,
            loading: true,
            pmorVisible: false,
            releaseid: '',
            releaseMember: {},
            joblist: ['前端', '后端'],
            members: [],
        };
    }
    //渲染
    componentDidMount() {
        this.getData();
    }
    //数据获取，过滤isquit的数据
    getData = () => {
        this.setState({
            dataSource: [{
                "key": 0,
                "staffName": "魏欢",
                "staffId": 1,
                "staffSex": "女",
                "department": "董事会",
                "staffTel": "13355223334",
                "staffLevel": "2",
            }, {
                "key": 1,
                "staffName": "真子则",
                "staffId": 2,
                "staffSex": "男",
                "department": "经理",
                "staffTel": "13388223334",
                "staffLevel": "2",
            }, {
                "key": 2,
                "staffName": "魏如梭",
                "staffId": 3,
                "staffSex": "女",
                "department": "行政",
                "staffTel": "13377223334",
                "staffLevel": "2",
            }, {
                "key": 3,
                "staffName": "魏一",
                "staffId": 4,
                "staffSex": "女",
                "department": "交通",
                "staffTel": "13366223334",
                "staffLevel": "2",
            }, {
                "key": 4,
                "staffName": "白百何",
                "staffId": 5,
                "staffSex": "女",
                "department": "企划",
                "staffTel": "13366278334",
                "staffLevel": "2",
            }, {
                "key": 5,
                "staffName": "甄子丹",
                "staffId": 6,
                "staffSex": "男",
                "department": "宣传",
                "staffTel": "13366225634",
                "staffLevel": "2",
            }, {
                "key": 6,
                "staffName": "闫明瑞",
                "staffId": 7,
                "staffSex": "男",
                "department": "市场",
                "staffTel": "13366223444",
                "staffLevel": "2",
            }, {
                "key": 7,
                "staffName": "高阳",
                "staffId": 8,
                "staffSex": "男",
                "department": "后勤",
                "staffTel": "13366221234",
                "staffLevel": "2",
            }, {
                "key": 8,
                "staffName": "文静",
                "staffId": 9,
                "staffSex": "女",
                "department": "销售",
                "staffTel": "13366223114",
                "staffLevel": "2",
            }]
        });

    }
    // getData = () => {
    //     this.setState({
    //         loading: true,
    //     });
    //     getMembers(this.state.url).then(res => {
    //         this.setState({
    //             loading: false,
    //             dataSource: res.data.data.list.filter(item => item.isQuit !== 1),
    //             showData: this.sortMemberList(res.data.data.list.filter(item => item.isQuit !== 1)),
    //             members: res.data.data.list.map(v => v.fkEmployeeGh),
    //         });
    //     }).catch(err => {
    //     }).finally(err => {
    //         this.setState({
    //             loading: false,
    //         });
    //     });
    // }
    //对人员列表数据排序处理
    // sortMemberList = (list) => {
    //     //把项目经理排到最前面
    //     let rlist = list;
    //     let PMIndex = 0;
    //     list.map((val, index) => {
    //         if (val.memberJob === '项目经理') {
    //             PMIndex = index;
    //         }
    //     });
    //     if (PMIndex !== 0) {
    //         list.unshift(list.splice(PMIndex, 1)[0])
    //         rlist = list;
    //     }
    //     return rlist;
    // }
    

    //----------------------------搜索功能----------------------------
    //设置输入的要搜索名字
    onChangeUserName = (e) => {
        const { value } = e.target;
        this.setState({
            searchName: value,
        });
    };
    //成员搜索
    onSearchUserName = (value) => {
        const { dataSource } = this.state;
        //console.log(dataSource)
        this.setState({
            dataSource: dataSource.filter(item => item.staffName.indexOf(value) !== -1),
            loading: false,
        });
        //console.log(this.state.showData);
        //console.log(this.state.dataSource);
    };
    部门搜索
    Department_Select = (value) => {
        const department = value;
        this.setState({
            searchDepartment: department,
        });
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => item.department.indexOf(value) !== -1),
            loading: false,
        });
    }
    //重置按钮清空搜索条件
    btnClear_Click = () => {
        this.setState({
            searchName: '',
            searchDepartment: undefined,
            dataSource: [],
            showData: [],
        });
        this.getData();
    };

    //----------------------------成员操作----------------------------
    //接受新建释放申请表单数据
    saveReleaseFormRef = formRef => {
        this.formRef = formRef;
    };
    //所有弹出框的取消显示
    handleCancel = () => {
        this.setState({
            visible: false,
            appvisible: false,
            editvisible: false,
            releaseVisible: false,
            pmorVisible: false
        });
    };

    //添加人员---------------------------------------
    //！！！弹出申请窗口-----------------------
    ApplyMember = () => {
        this.setState({
            appvisible: true,
        });
        const form = this.pmapp;
        form.resetFields();
    }
    //---------PM成员申请（chen）-------------
    // showApplyModel = () => {
    //     this.setState({
    //         appvisible: true,
    //     });
    // }
    handleApplyCancel = () => {
        this.setState({
            appvisible: false
        });
    };

    //！！！PMO直接添加成员
    //弹出添加窗口
    CreateMember = () => {
        this.setState({
            visible: true,
        });
        const form = this.pmoadd;
        form.resetFields();
    };
    //处理添加业务
    handleAdd = () => {
        const form = this.pmoadd;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            //console.log('Received values of form: ', values);
            const data = {
                fkProjectId: this.props.projid,
                fkEmployeeGh: values.fkEmployeeGh,
                memberJob: values.memberJob,
                memberFunc: values.memberFunc,
                memberSup: values.memberSup,
                memberType: values.memberType,
                estimateStartTime: moment(values.estimateStartTime).format('YYYY-MM-DD'),
                estimateEndTime: moment(values.estimateEndTime).format('YYYY-MM-DD'),
                memberJobBand: values.memberJobBand,
            };
            //console.log(data);
            // addMember(JSON.stringify(data)).then(res => {
            //     message.success(res.data.msg);
            //     this.getData();
            // });
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    //调离人员--------------------------------------------------------
    //根据权限判断操作
    onDelete = (id, gh) => {
        const data = {
            projectId: this.props.projid,
            employeeGh: gh,
        }


    };

    //PMO直接调离
    handleRelease = () => {
        console.log("zoule")
        // const form = this.pmoForm;
        // form.validateFields((err, values) => {
        //     if (err) {
        //         return;
        //     }
        //     const updata = {
        //         id: this.state.releaseid,
        //         realEndTime: moment(values.realEndTime).format('YYYY-MM-DD'),
        //         memberRemarks: values.memberRemarks
        //     }
        //     const releasedata = {
        //         memberId: this.state.releaseid,
        //         projectId: this.props.projid,
        //         memberLeaveGh: this.state.gh,
        //         memberLeaveRemark: values.memberRemarks,
        //         memberLeaveTime: moment(values.realEndTime).format('YYYY-MM-DD 00:00:00'),
        //     }
        //     updateMember(updata).then(res => {
        //     });
        //     releaseMember(JSON.stringify(releasedata)).then(res => {
        //         message.success(res.data.msg);
        //         this.getData();
        //     });
        //     form.resetFields();
        //     this.setState({
        //         pmorVisible: false
        //     });
        // });
    }
    //PM、PMO修改成员-------------------------------------------------
    editClick = (id, index) => {
        const form = this.editForm;
        const dataSource = [...this.state.dataSource];
        const editMembers = dataSource.filter(item => {
            if (item.id === id) {
                return item;
            }
        });
        this.setState({
            edit: editMembers[0],
        });
        var realStartTime;
        var estimateEndTime;
        if (dataSource[index].realStartTime === null) {
            realStartTime = null;
        } else {
            realStartTime = moment(dataSource[index].realStartTime, 'YYYY-MM-DD');
        }
        if (dataSource[index].estimateEndTime === null) {
            estimateEndTime = null;
        } else {
            estimateEndTime = moment(dataSource[index].estimateEndTime, 'YYYY-MM-DD');
        }
        form.setFieldsValue({
            memberName: dataSource[index].memberName,
            fkEmployeeGh: dataSource[index].fkEmployeeGh,
            memberJob: dataSource[index].memberJob,
            memberSup: dataSource[index].memberSup,
            memberType: dataSource[index].memberType,
            memberFunc: dataSource[index].memberFunc,
            memberJobBand: dataSource[index].memberJobBand,
            realStartTime: realStartTime,
            estimateEndTime: estimateEndTime,
        });
        this.setState({
            editvisible: true,
        });
    };
    handleUpdate = () => {
        console.log("修改")
        // const form = this.editForm;
        // form.validateFields((err, values) => {
        //     if (err) {
        //         return;
        //     }
        //     var startTime;
        //     var endTime;
        //     if (values.estimateEndTime != null) {
        //         endTime = moment(values.estimateEndTime).format('YYYY-MM-DD')
        //     } else {
        //         endTime = null;
        //     }
        //     if (values.realStartTime != null) {
        //         startTime = moment(values.realStartTime).format('YYYY-MM-DD')
        //     } else {
        //         startTime = null;
        //     }
        //     const data = {
        //         estimateEndTime: endTime,
        //         id: this.state.edit.id,
        //         memberFunc: values.memberFunc,
        //         memberJob: values.memberJob,
        //         memberJobBand: values.memberJobBand,
        //         memberSup: values.memberSup,
        //         realStartTime: startTime,
        //     }
        //     updateMember(data).then(res => {
        //         message.success('修改成功');
        //         this.getData();
        //     }).catch(err => {
        //         message.error('修改失败');
        //     });
        //     this.setState({
        //         editvisible: false
        //     });
        // });
    }

    //-----------------------------------------------------------------
    render() {
        const { searchName, searchDepartment, status, dataSource, appvisible, pmorVisible, loading, releaseMember, joblist } = this.state;
        const { authority } = this.props;
        return (
            <div>
                <div id="cards" style={{ padding: '15px' }}>
                    <Card title="景区员工">
                    <Row style={{ float: 'right', zIndex: '2' }}>
                        <Col className="gutter-row" style={{ marginBottom: '15px' }} span={8}>
                            <Search
                                placeholder="员工搜索"
                                prefix={<Icon type="user" />}
                                onChange={this.onChangeUserName}
                                onSearch={this.onSearchUserName}
                                value={searchName}
                            />
                        </Col>
                        <Col className="gutter-row" span={9}>
                            <InputGroup compact>
                                <Select style={{ width: '165px', marginLeft: '15.5px' }}
                                    options={options}
                                    placeholder="角色搜索"
                                    onChange={this.Department_Select}
                                    value={searchDepartment}
                                    onMouseEnter={this.getJob}
                                >
                                    {
                                        joblist.map((item, index) => (
                                            <Option key={index} value={item}>{item}</Option>
                                        ))
                                    }
                                </Select>
                            </InputGroup>
                        </Col>
                        <Col className="gutter-row" span={7}>
                            <div className="btnOpera">
                                <Button type="primary" onClick={this.btnClear_Click} style={{ background: '#f8f8f8', color: '#108ee9' }}>清空搜索条件</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ float: 'left', zIndex: '1' }}>
                        <Button icon="plus" onClick={this.CreateMember}>添加成员</Button>
                    </Row>
                    <StaffTable
                        status={status}
                        dataSource={dataSource}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                        </Card>
                </div>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        );
    }
}

export default Staff;