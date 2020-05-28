import React, { Component } from 'react'
import { Layout } from 'antd';
import NavSide from './components/UI/Body/NavSide'
import NavTop from './components/UI/Body/NavTop'
import Router from './router'
//import Footer from './components/UI/Body/Footer'

const {Sider, Content, Footer} = Layout

class Admin extends Component{
    render(){
        return(
            <Layout>
                <Sider span="4" style={{backgroundColor:'#001529'}}>
                    <NavSide/>
                </Sider>
                    <Layout>
                        <NavTop />
                        <Content>
                            {/* Content */}
                            <Router></Router>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>ZUCC gcy@2020</Footer>
                    </Layout>
            </Layout>
        )
    }
}

export default Admin;