import React, { Component } from 'react'
import NavMenu from '../../../Function/NavMenu'

const menus = [
    {
        title: '首页',
        icon: 'icon-home',
        key: '/admin/home'
    },
    {
        title: '景区管理',
        icon: 'icon-kuaidiwuliu',
        key: '/admin/area',
        subs: [
            {
                key: '/admin/area/spot',
                title: '景点管理',
                icon: ''
            },
            { 
                key: '/admin/area/function', 
                title: '设施管理', 
                icon: ''
            },
            { 
                key: '/admin/area/line', 
                title: '线路管理', 
                icon: ''
            },
        ]
    },
    {
        title: '用户管理',
        icon: 'icon-Customermanagement',
        key: '/admin/user',
        subs: [
            { key: '/admin/display/carousel', title: '游客信息', icon: '' },
            { key: '/admin/user/suggestion', title: '反馈管理', icon: '' },
        ]
    },
    {
        title: '商品管理',
        icon: 'icon-Similarproducts',
        key: '/admin/product',
    },
    {
        title: '通知管理',
        icon: 'icon-email',
        key: '/admin/news'
    },
    {
        title: '订单管理',
        icon: 'icon-order',
        key: '/admin/order',
    },
    {
        title: '员工管理',
        icon: 'icon-tongxunlu',
        key: '/admin/staff'
    }
]
const styles = {
    logo: {
        height: '48px',
        background: 'rgba(255, 255, 255, .2)',
        paddingTop: '16px',
        marginLeft:'16px',
        marginRight:'16px'
    },
    bg:{
        backgroundColor:'#001529',
        height: '100vh',
        fontSize:'18px'
    }
}

export default class Sidemenu extends Component {
    render() {

        return (
            <div style={styles.bg}>
                <br/>
                <div style={styles.logo}></div>
                <br />
                <NavMenu menus={menus} />
            </div>
        )
    }
}
