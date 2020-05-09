import React from 'react';
import styles from './index.less';
import { Menu } from 'antd';
import { history } from 'umi'
import {
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class Siderbar extends React.Component{
  state={
    menuList:[
      {
        name:'菜单1',
        key:'1',
        path:'/index'
      },
      {
        key:'sub1',
        name:'菜单2',
        ico:'',
        sub:[
          {
            name:'菜单2-1',
            key:'2',
            path:'/test'
          },
        ]
      }
    ]
  }
  toPath(path:string){
    history.push(path)
  }
  render(){
    return (
      <div>
        <div className="uLogo">
          <img className="" src="https://preview.pro.ant.design/static/logo.f0355d39.svg" alt="" />
          <span>Umi Admin</span>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {
          this.state.menuList.map((item1:any)=>(
            // <div>111</div>
            item1.sub?(
              <SubMenu key={item1.key} icon={<UserOutlined />} title={item1.name}>
                {
                  item1.sub.map((item2:any)=>(
                    <Menu.Item onClick={()=>{this.toPath(item2.path)}} key={item2.key} >
                      {item2.name}
                    </Menu.Item>
                  ))
                }
              </SubMenu>
            ):(
              <Menu.Item onClick={()=>{this.toPath(item1.path)}} key={item1.key} icon={<UserOutlined />}>
                {item1.name}
              </Menu.Item>
            )
          ))
        }
        </Menu>
      </div>
    );
  }
}
