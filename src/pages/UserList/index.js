import React, { Component } from 'react';
import { Row, Col, Input, Icon, Button, BackTop, Card, Modal } from 'antd';
//import style from './member.module.scss';
import moment from 'moment';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
import UserTable from './userTable'
//import http from 'utils/http';
//import { releaseMember, updateMember, addMember, listMemberJob } from 'api/member';
//import MemberEditForm from './memberEditForm';
//import PMOReleaseForm from './PMORelease';
//import { MemberAddForm, MemberApplyForm, MemberReleaseForm } from 'components';

const { Search } = Input;

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

@inject('appStore') @observer
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            //url: `/member/listMember?projectId=${this.props.projid}`,
            searchName: '',
            //editvisible: false, //编辑窗口
            //visible: false, //添加窗口
            //appvisible: false, //申请窗口
            releaseVisible: false,//删除窗口
            dataSource: [],
            showData: [],
            tableRowKey: 0,
            loading: true,
            pmorVisible: false,
            releaseid: '',
            releaseStaff: undefined,
            joblist: ['销售', '财务', '市场', '宣传', '企划', '交通', '行政', '文秘', '经理', '董事会'],
            members: [],
        };
    }
    //渲染
    // componentDidMount() {
    //     this.getData();
    // }
    //数据获取，过滤isquit的数据
    // getData = () => {
    //     this.setState({
    //         dataSource: [{
    //             "key": 0,
    //             "userName": "简丽",
    //             "userId": 1,
    //             "userEmail": "marinus.jagesar@example.com",
    //             "userWechat": "jagesar",
    //             "userTel": "18355223334",
    //             "createTime": "2",
    //         }, {
    //             "key": 1,
    //             "userName": "高达",
    //             "userId": 2,
    //             "userEmail": "zachary.lavigne@example.com",
    //             "userWechat": "zachary",
    //             "userTel": "13388223334",
    //             "createTime": "2",
    //         }, {
    //             "key": 2,
    //             "userName": "白飞飞",
    //             "userId": 3,
    //             "userEmail": "levi.willis@example.com",
    //             "userWechat": "levi",
    //             "userTel": "13377223334",
    //             "createTime": "2",
    //         }, {
    //             "key": 3,
    //             "userName": "朱七七",
    //             "userId": 4,
    //             "userEmail": "tobias.pedersen@example.com",
    //             "userWechat": "tobias",
    //             "userTel": "13366223334",
    //             "createTime": "2",
    //         }, {
    //             "key": 4,
    //             "userName": "张飞",
    //             "userId": 5,
    //             "userEmail": "samuel.leon@example.com",
    //             "userWechat": "samuel",
    //             "userTel": "13366278334",
    //             "createTime": "2",
    //         }, {
    //             "key": 5,
    //             "userName": "李达康",
    //             "userId": 6,
    //             "userEmail": "dakang@example.com",
    //             "userWechat": "dakang",
    //             "userTel": "18666225634",
    //             "createTime": "2",
    //         }, {
    //             "key": 6,
    //             "userName": "马冬梅",
    //             "userId": 7,
    //             "userEmail": "dongmei@example.com",
    //             "userWechat": "dongmei",
    //             "userTel": "13366323444",
    //             "createTime": "2",
    //         }, {
    //             "key": 7,
    //             "userName": "展昭",
    //             "userId": 8,
    //             "userEmail": "zhanzhao@example.com",
    //             "userWechat": "zhanzhao",
    //             "userTel": "13712345678",
    //             "createTime": "2",
    //         }, {
    //             "key": 8,
    //             "userName": "范闲",
    //             "userId": 9,
    //             "userEmail": "fanxian@example.com",
    //             "userWechat": "fanxian",
    //             "userTel": "13398223114",
    //             "createTime": "2",
    //         }]
    //     });

    // }
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
            dataSource: dataSource.filter(item => item.userName.indexOf(value) !== -1),
            loading: false,
        });
        //console.log(this.state.showData);
        //console.log(this.state.dataSource);
    };
    handleDelete(record){
        this.props.appStore.handleDelete(record);
    }
    //重置按钮清空搜索条件
    btnClear_Click = () => {
        this.setState({
            searchName: '',
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
            // const data = {
            //     fkProjectId: this.props.projid,
            //     fkEmployeeGh: values.fkEmployeeGh,
            //     memberJob: values.memberJob,
            //     memberFunc: values.memberFunc,
            //     memberSup: values.memberSup,
            //     memberType: values.memberType,
            //     estimateStartTime: moment(values.estimateStartTime).format('YYYY-MM-DD'),
            //     estimateEndTime: moment(values.estimateEndTime).format('YYYY-MM-DD'),
            //     memberJobBand: values.memberJobBand,
            // };
            //console.log(data);
            // addMember(JSON.stringify(data)).then(res => {
            //     message.success(res.data.msg);
            //     this.getData();
            // });
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    //删除人员--------------------------------------------------------
    // onDelete = (key) => {
    //     console.log(key)
    //     this.setState({
    //         releaseStaff: key,
    //         releaseVisible: true
    //     })
    //     console.log(this.state)
    // };

    // onDeleteConfirm = () => {
    //     console.log(this.state)
    //     const dataSource = [...this.state.dataSource];
    //     const { releaseStaff } = this.state;
    //     this.setState({
    //         dataSource: dataSource.filter(item => item.key !== releaseStaff),
    //         releaseVisible: false
    //     });
    // }

    //PM、PMO修改成员-------------------------------------------------
    editClick = (id, index) => {
        const form = this.editForm;
        const dataSource = [...this.state.dataSource];
        const editMembers = dataSource.filter(item => {
            if (item.id === id) {
                return item;
            }
            return null;
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

    //-----------------------------------------------------------------
    render() {
        const { searchName, status, releaseVisible, loading } = this.state;
        const dataSource = toJS(this.props.appStore.visitors);
        return (
            <div>
                <div id="cards" style={{ padding: '15px' }}>
                    <Card title="景区游客">
                        {/* <Row style={{ float: 'right', zIndex: '2' }}>
                            <Col className="gutter-row" style={{ marginBottom: '15px' }} span={8}>
                                <Search
                                    placeholder="用户搜索"
                                    prefix={<Icon type="user" />}
                                    onChange={this.onChangeUserName}
                                    onSearch={this.onSearchUserName}
                                    value={searchName}
                                />
                            </Col>
                            <Col className="gutter-row" span={7}>
                                <div className="btnOpera">
                                    <Button type="primary" onClick={this.btnClear_Click} style={{ background: '#f8f8f8', color: '#108ee9' }}>清空搜索条件</Button>
                                </div>
                            </Col>
                        </Row> */}
                        <UserTable
                            status={status}
                            dataSource={dataSource}
                            // onDelete={this.handleDelete}
                            // editClick={this.editClick}
                            loading={loading}
                        />
                    </Card>
                    {/* <Modal
                        title="警告"
                        visible={releaseVisible}
                        onOk={this.onDeleteConfirm}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        okType="danger"
                    >
                        <p>确认删除成员？</p>
                    </Modal> */}
                </div>
                <BackTop visibilityHeight={200} style={{ right: 50 }} />
            </div>
        );
    }
}

export default User;