import React from 'react';
import styles from './index.less';
import Siderbar from '../compontents/siderbar/index'
import Headers from '../compontents/header/index'
import { Layout, Breadcrumb } from 'antd'
import {history} from 'umi'

const { Header, Content, Footer, Sider } = Layout;

export default class Layouts extends React.Component {
    
    state = {
        collapsed: false,
      };
    
      onCollapse = (collapsed:boolean) => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
      componentDidMount(){
        if(!localStorage.userInfo){
          history.push('/login')
        }
      }
      render() {
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <Siderbar></Siderbar>  
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <Headers></Headers>
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: '70vh'}}>
                { this.props.children }
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        )
      }

}
