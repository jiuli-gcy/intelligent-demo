import React, { Component } from 'react'
import { BackTop, Card, Button } from 'antd'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
import AreaForm from './AreaAddForm'
import AreaEditForm from './AreaEditForm'
import AreaTable from './AreaTable'

@inject('areaStore') @observer
class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      addvisible: false, //窗口隐藏
      editvisible:false
    };
  }

  requestdata = () => {
    this.props.areaStore.getDataFromSessionStorage();
    const areas = toJS(this.props.areaStore.areas);
    this.renderMap(areas);
    console.log(areas)
  }
  // UNSAFE_componentWillMount() {
  //   this.requestdata()
  // }
  componentDidMount() {
    this.requestdata()
  }
  //渲染地图
  renderMap = (data) => {

    this.map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(120.162416, 30.333125);  // 创建点坐标(学校中心)
    this.map.centerAndZoom(point, 19);                 // 初始化地图，设置中心点坐标和地图级别
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    this.map.addEventListener("click",function(e){
      alert("点击位置的坐标为："+ e.point.lng + "," + e.point.lat);
    });
    // 调用景区绘制方法
    this.drwaArea(data);
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
        strokeWeight: 4,
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
      //var marker = new window.BMapGL.Marker(point);
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
      //this.map.addOverlay(marker);
    }
  }

  //新建弹窗
  CreateArea = () => {
    this.setState({
      addvisible: true,
      isUpdate: false,
    });
    const form = this.addForm;
    form.resetFields();
  };

  editClick = (id, index) => {
    const form = this.editForm;
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
      id: dataSource[index].id,
      key: dataSource[index].key,
      name: dataSource[index].name,
      fStatus: dataSource[index].fStatus,
      coordinate: dataSource[index].coordinate
    });
    this.setState({
      editvisible: true,
    });
  };
  handleUpdate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        editvisible: false
      });
    });
  }

  //取消
  handleCancel = () => {
    this.setState({ addvisible: false,editvisible:false });
  };

  render() {
    const { isUpdate, addvisible, editvisible } = this.state;
    const dataSource = toJS(this.props.areaStore.areas);

    return (
      <div id="cards" style={{ padding: '15px' }}>
        <Card title="景区管理" style={{ marginTop: 10 }} extra={<Button type="primary" onClick={this.CreateArea}>添加景区</Button>} >
          <div>共{dataSource.length}个景点</div>
          <AreaTable
            dataSource={dataSource}
            editClick={this.editClick} />
          <div id="container" style={{ height: 400 }}></div>
        </Card>
          <AreaEditForm
            ref={(form) => this.editForm = form}
            visible={editvisible}
            isUpdate={isUpdate}
            onCancel={this.handleCancel}
            onCreate={this.handleUpdate}
            title="修改信息" okText="更新"
          />
          <AreaForm
            ref={(form) => this.addForm = form}
            isUpdate={isUpdate}
            visible={addvisible}
            onCancel={this.handleCancel}
            title="新建景区" okText="创建"
          />
          <BackTop visibilityHeight={200} style={{ right: 50 }} />
      </div>
    );
  }
}
export default Area