const AdminList = [
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
                key: '/admin/area/facility',
                title: '设施管理',
                icon: ''
            }
        ]
    },
    {
        title: '用户管理',
        icon: 'icon-Customermanagement',
        key: '/admin/user',
        subs: [
            { key: '/admin/user/userinfo', title: '游客信息', icon: '' },
            { key: '/admin/user/suggestion', title: '反馈管理', icon: '' },
        ]
    },
    {
        title: '通知管理',
        icon: 'icon-email',
        key: '/admin/news'
    },
    {
        title: '员工管理',
        icon: 'icon-tongxunlu',
        key: '/admin/staff/staffinfo',
        // subs: [
        //     { key: '/admin/staff/staffinfo', title: '员工信息', icon: '' },
        //     { key: '/admin/staff/permission', title: '权限管理', icon: '' },
        // ]
    }
];
export default AdminList;