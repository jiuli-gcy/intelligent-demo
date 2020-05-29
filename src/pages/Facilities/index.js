import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
import FacilityForm from './FacilityForm'
import FacilitiesTable from './FacilitiesTable'

@inject('areaStore') @observer
class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      visible: false, //窗口隐藏
    };
  }

  requestdata = () => {
    const facilities = toJS(this.props.areaStore.facilities);
    const areas = toJS(this.props.areaStore.areas);
    this.renderMap(areas,facilities);
  }
  // UNSAFE_componentWillMount() {
  //   this.requestdata()
  // }
  componentDidMount() {
    this.requestdata()
  }
  //渲染地图
  renderMap = (area,data) => {

    this.map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(120.162416, 30.333125);  // 创建点坐标(学校中心)
    this.map.centerAndZoom(point, 19);                 // 初始化地图，设置中心点坐标和地图级别
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // 调用景区绘制方法
    this.drwaArea(area);
    //设施绘制方法
    this.drwaPoint(data);

    // 添加地图控件
    var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
    this.map.addControl(scaleCtrl);
    var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加比例尺控件
    this.map.addControl(zoomCtrl);
  }
  //绘制景区
  drwaArea = (data) => {
    const location = data.map(item => item.location);
    const length = location.length;
    for (let i = 0; i < length; i++) {
      let trackPoint = [];
      let point = location[i];
      //console.log(point.length)
      for (let i = 0; i < point.length; i++) {
        let list = point[i];
        let gps = list.split(',')
        trackPoint.push(new window.BMapGL.Point(gps[0], gps[1]));
      }
      //console.log(trackPoint)
      // 绘制景区到地图
      let polygon = new window.BMapGL.Polygon(trackPoint, {
        strokeColor: '#CE0000',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#ff8605',
        fillOpacity: 0.4
      })
      this.map.addOverlay(polygon);
    }
  }
  //绘制名称
  drwaPoint = (data) => {
    const coordinate = data.map(item => item.coordinate);
    const name = data.map(item => item.name);
    const length = coordinate.length;

    for (let i = 0; i < length; i++) {
      let p = coordinate[i].split(",")
      var point = new window.BMapGL.Point(p[0], p[1]);
      //console.log(point)
      var marker = new window.BMapGL.Marker(point);
      var opts = {
        position: point,    // 指定文本标注所在的地理位置
        offset: new window.BMapGL.Size(0, 0)    //设置文本偏移量
      }
      var label = new window.BMapGL.Label(name[i], opts);  // 创建文本标注对象
      label.setStyle({
        color: 'red',
        fontSize: '12px',
        height: '20px',
        lineHeight: '20px',
        fontFamily: '微软雅黑'
      });
      this.map.addOverlay(label);
      this.map.addOverlay(marker);
    }
  }

  //接受新建表单数据
  saveFormRef = (form) => {
    this.form = form;
  };
  //新建弹窗
  CreateArea = () => {
    this.setState({
      visible: true,
      isUpdate: false,
    });
    const form = this.form;
    form.resetFields();
  };
  //填充表格行
  handleCreateOk (data) {
   
      console.log('Received: ', data);
      
      // addCustomer(data).then(res => {
      //   message.success(res.data.msg);
      //   this.getData();
      // })
      this.props.areaStore.handleOP(data, 'add', this.handleCancel);
      
  }

  editClick = (id, index) => {
    const form = this.form;
    console.log(id + "is" + index)
    const dataSource = toJS(this.props.areaStore.areas);
    const editArea = dataSource.filter(item => {
      if (item.id === id) {
        return item;
      }
      return null;
    });
    this.setState({
      edit: editArea[0],
      isUpdate:true
    });
    form.setFieldsValue({
      name: dataSource[index].name,
      fStatus: dataSource[index].fStatus,
      coordinate: dataSource[index].coordinate,
    });
    this.setState({
      visible: true
    });
  };
  handleUpdate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        visible: false
      });
    });
  }

  //取消
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { isUpdate, visible } = this.state;
    const dataSource = toJS(this.props.areaStore.facilities);

    return (
      <div id="cards" style={{ padding: '15px' }}>
        <Card title="设施管理" style={{ marginTop: 10 }} extra={<Button type="primary" onClick={this.CreateArea}>添加景区</Button>} >
          <div>共{dataSource.length}个设施</div>
          <FacilitiesTable
            dataSource={dataSource}
            editClick={this.editClick} />
          <div id="container" style={{ height: 400 }}></div>
        </Card>
        {isUpdate ?
          <FacilityForm
            ref={this.saveFormRef}
            visible={visible}
            onCancel={this.handleCancel}
            onCreate={this.handleUpdate}
            title="修改信息" okText="更新"
          /> :
          <FacilityForm
            ref={this.saveFormRef}
            visible={visible}
            onCancel={this.handleCancel}
            handleCreateOk={this.handleCreateOk}
            title="新建景区" okText="创建"
          />}
      </div>
    );
  }
}
export default Area