import React, { Component } from 'react'
import { Row , Col , Layout } from 'antd';
import NavSide from './components/UI/Body/NavSide'
import NavTop from './components/UI/Body/NavTop'
//import Footer from './components/UI/Body/Footer'

const {Content, Footer} = Layout

class Admin extends Component{
    render(){
        return(
            <Row>
                <Col span="4" style={{backgroundColor:'#001529'}}>
                    <NavSide/>
                </Col>
                <Col span="20"  style={{background: '#fff', padding: '0 16px'}}>
                    <NavTop />
                    <Layout>
                        <Content>
                            {/* Content */}
                            {this.props.children}
                        </Content>
                        <Footer style={{textAlign: 'center'}}>ZUCC gcy@2020</Footer>
                    </Layout>
                </Col>
            </Row>
        )
    }
}

export default Admin;