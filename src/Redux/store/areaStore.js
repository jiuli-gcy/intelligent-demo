import { observable } from 'mobx'

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
}

export default new AreaStore()