import React, { Component } from 'react';
import styles from './index.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { connect } from 'dva'
import axios from '../../commons/axios'
import md5 from 'md5'

const mapStateToProps = (state: any) => {
  const { userName } = state.userInfo 
  return {
    userName, 
  }
}


class Login extends Component<any>{
  onFinish = (values: any) => {
    axios({
      method: "post",
      url: "/loginSystem",
      data: {
        userName: values.username,
        password: md5(values.password)
      }
    }).then((res: any) => {
      if (res && res.code === 200) {
        localStorage.userInfo = JSON.stringify(res.data)
        // this.props.dispatch({
        //   type: 'userInfo/save',
        //   payLoad: {
        //     userName: res.data.userName
        //   }
        // })
        history.push('/')
      }

    })
  };
  render() {
    return (
      <div className={styles.rContent}>
        <div className={styles.title}>
          <img className={styles.avatar} src="https://preview.pro.ant.design/static/logo.f0355d39.svg" alt="" />
          <span>Umi Admin</span>
        </div>
        <div className={styles.rLogin}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <span className="login-form-forgot">
                忘记密码
          </span>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
    );
  }
}
export default connect(mapStateToProps)(Login)
