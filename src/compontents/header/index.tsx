import React from 'react';
import { connect} from 'dva';
import styles from './index.less';
import { Menu, Dropdown } from 'antd';
import { history } from 'umi';
import {
  LogoutOutlined,
} from '@ant-design/icons';

const mapStateToProps = (state:any)=>{
  const { userName} = state.userInfo 
  return {
    userName, 
  }
}

class Siderbar extends React.Component<any>{
 loginOut = ()=>{
  localStorage.removeItem('userInfo')
  this.props.dispatch({
    type: 'userInfo/save',
    payLoad: {
      userName: ''
    }
  })
  history.push('/login')
 }
 menu = (
    <Menu>
      <Menu.Item onClick={this.loginOut}>
        <LogoutOutlined twoToneColor="#eb2f96" />
          退出登录
      </Menu.Item>
    </Menu>
  );
  render(){
    let userInfo = localStorage.userInfo?JSON.parse(localStorage.userInfo):{}
    return (
      <div className={styles.header}>
        <div>{}</div>
        <div className={styles.dropdown}>
          <Dropdown overlay={this.menu}>
            <div>
              <img className={styles.avatar} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt=""/>
              <span className={styles.name}>{userInfo.userName}</span>  
            </div>
          </Dropdown>
        </div>
        
      </div>
    );
  }
}
export default connect(mapStateToProps)(Siderbar)


