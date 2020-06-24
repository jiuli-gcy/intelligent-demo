import { observable, action } from 'mobx'
import { isAuthenticated, authenticateSuccess, logout } from '../../utils/Session'

class AppStore {
  @observable isLogin = !!isAuthenticated()  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
  @observable users = []  //模拟用户数据库
  @observable loginUser = {}  //当前登录用户信息
  @observable visitors = [{
    "key": 0,
    "userName": "简丽",
    "userId": 1,
    "userEmail": "marinus.jagesar@example.com",
    "userWechat": "jagesar",
    "userTel": "18355223334",
    "createTime": "2",
  }, {
    "key": 1,
    "userName": "高达",
    "userId": 2,
    "userEmail": "zachary.lavigne@example.com",
    "userWechat": "zachary",
    "userTel": "13388223334",
    "createTime": "2",
  }, {
    "key": 2,
    "userName": "白飞飞",
    "userId": 3,
    "userEmail": "levi.willis@example.com",
    "userWechat": "levi",
    "userTel": "13377223334",
    "createTime": "2",
  }, {
    "key": 3,
    "userName": "朱七七",
    "userId": 4,
    "userEmail": "tobias.pedersen@example.com",
    "userWechat": "tobias",
    "userTel": "13366223334",
    "createTime": "2",
  }, {
    "key": 4,
    "userName": "张飞",
    "userId": 5,
    "userEmail": "samuel.leon@example.com",
    "userWechat": "samuel",
    "userTel": "13366278334",
    "createTime": "2",
  }, {
    "key": 5,
    "userName": "李达康",
    "userId": 6,
    "userEmail": "dakang@example.com",
    "userWechat": "dakang",
    "userTel": "18666225634",
    "createTime": "2",
  }, {
    "key": 6,
    "userName": "马冬梅",
    "userId": 7,
    "userEmail": "dongmei@example.com",
    "userWechat": "dongmei",
    "userTel": "13366323444",
    "createTime": "2",
  }, {
    "key": 7,
    "userName": "展昭",
    "userId": 8,
    "userEmail": "zhanzhao@example.com",
    "userWechat": "zhanzhao",
    "userTel": "13712345678",
    "createTime": "2",
  }, {
    "key": 8,
    "userName": "范闲",
    "userId": 9,
    "userEmail": "fanxian@example.com",
    "userWechat": "fanxian",
    "userTel": "13398223114",
    "createTime": "2",
  }]

  @action toggleLogin(flag, info = {}) {
    this.loginUser = info  //设置登录用户信息
    if (flag) {
      authenticateSuccess(info.username)
      this.isLogin = true
    } else {
      logout()
      this.isLogin = false
    }

  }
  @action initUsers() {
    const localUsers = localStorage['users'] ? JSON.parse(localStorage['users']) : []
    this.users = [{ username: 'admin', password: 'admin' }, { username: 'staff', password: 'staff' }, ...localUsers]
  }
  @action handleDelete(item){
    this.dataSource.forEach((data, index) => {
        if(data.userId === item.userId){
            this.dataSource.splice(index, 1);
        }
    });
}
}

export default new AppStore()