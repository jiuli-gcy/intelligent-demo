import { observable, action, toJS } from 'mobx'
const DATAKEY = 'area-store-data';
class AreaStore {
    @observable areas = [
        {
            key: 1,
            id: 1,
            name: "情人坡",
            hot: 32,
            fStatus: '正常',
            tags: ['休闲', '绿化'],
            coordinate: "120.162394,30.332853",
            location: ["120.162237,30.33301", "120.162538,30.332994", "120.162614,30.332745", "120.162228,30.332756"]
        }, {
            key: 2,
            id: 2,
            name: "北秀",
            hot: 32,
            fStatus: '维护中',
            tags: ['商超设施'],
            coordinate: "120.163189,30.336858",
            location: ["120.162623, 30.336965", "120.163148, 30.337136", "120.163759, 30.337124", "120.163705, 30.336801", "120.163081, 30.336602", "120.162735, 30.336606"]
        }, {
            key: 3,
            id: 3,
            name: "问源",
            hot: 32,
            fStatus: '正常',
            tags: ['旅游住宿'],
            coordinate: "120.163543,30.334033",
            location: ["120.163382,30.334384", "120.163395,30.333963", "120.16432,30.333959", "120.164657,30.334364"]
        }
    ]
    @observable facilities = [
        {
            key: 1,
            areaid: 1,
            name: "休闲长椅",
            fStatus: '正常',
            tags: ['休闲'],
            coordinate: "120.162394,30.332751"
        }, {
            key: 2,
            areaid: 1,
            name: "草坪",
            fStatus: '正常',
            tags: ['绿化'],
            coordinate: "120.162439,30.332857",
        }, {
            key: 3,
            areaid: 2,
            name: "北秀超市",
            fStatus: '正常',
            tags: ['商超设施'],
            coordinate: "120.163175,30.336835",
        }, {
            key: 4,
            areaid: 3,
            name: "问源宾馆",
            fStatus: '正常',
            tags: ['旅游住宿'],
            coordinate: "120.163548,30.334026",
        }
    ]
    @observable total = [

    ]

    @action getDataFromSessionStorage = () => {
        let data;
        const dataStr = sessionStorage.getItem(DATAKEY);
        if (!dataStr) {
            // 如果不存在
            data = {};
        } else {
            // 如果存在
            data = JSON.parse(dataStr);
        }
        // 改变数据，触发渲染
        this.data = data;
    }
    @action setDataToSessionStorage = (data) => {
        const dataStr = JSON.stringify(data);
        sessionStorage.setItem(DATAKEY, dataStr);
    }

    @action handleOP(item, op, callback){
        if(op === 'add'){
            this.areas.push(item);
            console.log(toJS(this.areas))
        }else {
            this.areas.forEach((data, index) => {
                if(data.id === item.id){
                    this.areas.splice(index, 1, item);
                }
            });
        }
        if(callback){
            callback();
        }
    }
    @action handlefOP(item, op, callback){
        if(op === 'add'){
            this.facilities.push(item);
            console.log(toJS(this.facilities))
        }else {
            this.facilities.forEach((data, index) => {
                if(data.id === item.id){
                    this.facilities.splice(index, 1, item);
                }
            });
        }
        if(callback){
            callback();
        }
    }
    
}

export default new AreaStore()