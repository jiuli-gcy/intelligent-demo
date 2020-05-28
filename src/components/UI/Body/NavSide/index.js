import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NavMenu from '../../../Function/NavMenu'
import menuAdmin from '../../../../config/menuAdmin'

const styles = {
    logo: {
        height: '48px',
        background: 'rgba(255, 255, 255, .2)',
        paddingTop: '16px',
        marginLeft: '16px',
        marginRight: '16px'
    },
    bg: {
        backgroundColor: '#001529',
        height: '100vh',
        fontSize: '18px'
    }
}

@inject('appStore') @observer
class Sidemenu extends Component {
    
    render() {
        return (
            <div style={styles.bg}>
                <br />
                <div style={styles.logo}></div>
                <br />
                    <NavMenu menus={menuAdmin} />
            </div>
        )
    }
}

export default Sidemenu;