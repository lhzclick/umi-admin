import React, { Component } from 'react'
import { Select, Table, Button } from 'antd';
import axios from '../../commons/axios'
import styles from './index.less'
const { Option } = Select;



class FilterTable extends Component {
    state = {
        auth_account_status: '',
        account_type: '',
        dataSource: [],
        current: 1,
        pageSize: 10,
        total: 0
    };

    componentDidMount() {
        this.getData()
    }

    handleChange1 = (e:any) => {
        let es = e ? e : ''
        this.setState({
            auth_account_status: es,
            current: 1,
            pageSize: 10,
        }, () => {
            this.getData()
        })
    }
    handleChange2 = (e:any) => {
        let es = e ? e : ''
        this.setState({
            account_type: es,
            current: 1,
            pageSize: 10,
        }, () => {
            this.getData()
        })
    }

    getData = () => {
        axios({
            url: "/getCompanyListSystem",
            method: "post",
            data: {
                pageNo: this.state.current,
                pageSize: this.state.pageSize,
                auth_account_status: this.state.auth_account_status,
                account_type: this.state.account_type,
            }
        }).then((res:any) => {
            if (res && res.code === 200) {
                this.setState({
                    dataSource: res.data.list,
                    total: res.data.total,
                })
            }
        });

    }
    onShowSizeChange = (current:any, pageSize:any) => {
        this.setState({
            current: current,
            pageSize: pageSize
        }, () => {
            this.getData()
        })

    }

    handleStatus = (item:any) => {
        axios({
            method: "post",
            url: "/authSystem",
            data: {
                login_id: item.login_id,
                auth_account_status: item.auth_account_status === '1' ? '2' : '1',
                business_name: item.business_name,
                account_type: item.account_type,
                tel: item.tel
            }
        }).then((res:any) => {
            if (res && res.code === 200) {
                this.getData();
            }
        });
    }
    render() {
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'business_name',
                width: 100,
            },
            {
                title: '联系人姓名',
                dataIndex: 'concat_name',
                width: 100,
            },
            {
                title: '联系人电话',
                dataIndex: 'tel',
                width: 100,
            },
            {
                title: '注册时间',
                dataIndex: 'register_time',
                width: 100,
            },
            {
                title: '审核时间',
                dataIndex: 'verify_time',
                width: 100,
            },
            {
                title: '禁用时间',
                dataIndex: 'disable_time',
                width: 100,
            },
            {
                title: '复用时间',
                dataIndex: 'multiplex_time',
                width: 100,
            },
            {
                title: '电子邮箱',
                dataIndex: 'mail',
                width: 100,
            },
            {
                title: '账号类型',
                dataIndex: 'account_type',
                width: 100,
            },
            {
                title: '省市县',
                dataIndex: 'province_id',
                width: 100,
                render: (v:any, item:any, i:any) => (
                    <div>
                        <span>{item.province_id}</span>
                        <span>{item.city_id}</span>
                        <span>{item.county_id}</span>
                    </div>
                )
            },
            {
                title: '详细地址',
                dataIndex: 'detailed_address',
                width: 100,
            },
            {
                title: '信用额度',
                dataIndex: 'credit_quota',
                width: 100,
            },
            {
                title: '操作',
                dataIndex: 'auth_account_status',
                width: 100,
                render: (v:any, item:any, i:any) => (
                    <div>
                        <Button onClick={(e) => this.handleStatus(item, e)}>
                            {v === '1' ? '禁用' : '启用'}
                        </Button>
                    </div>
                )
            },
        ];
        return (
            <div className={styles.auth}>
                <div>
                    <Select placeholder="请选择状态" style={{ width: 200 }} onChange={this.handleChange1} allowClear >
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                    </Select>
                    <Select placeholder="请选择状态" style={{ width: 200, marginLeft: 20 }} onChange={this.handleChange2} allowClear>
                        <Option value="1">制造商</Option>
                        <Option value="2">服务商</Option>
                    </Select>
                </div>
                <div className={styles.table}>
                    <Table rowKey={record => record.login_id} dataSource={this.state.dataSource} columns={columns} pagination={{
                        showSizeChanger: true,
                        current: this.state.current,
                        pageSize: this.state.pageSize,
                        total: this.state.total,
                        onChange: this.onShowSizeChange,
                        onShowSizeChange: this.onShowSizeChange

                    }} />
                </div>
            </div>
        );
    }

}

export default class index extends Component {
      state={
          
      }
      componentDidMount() {
        
    }
   
    render() {
        return (
          <FilterTable ></FilterTable>
        );
    }
}