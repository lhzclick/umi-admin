import React, { Component } from 'react'
import { Select, Table, Button } from 'antd';
import axios from '../../commons/axios'
import { connect } from 'dva'
import styles from './index.less'
const { Option } = Select;
const mapStateToProps = (state: any) => {
    return state
}


class FilterTable extends Component {
    state = {
        auth_account_status: '',
        account_type: '',
        dataSource: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
    };

    componentDidMount() {
        this.getData()
    }

    handleChange1 = (e:any) => {
        let es = e ? e : ''
        this.setState({
            auth_account_status: es,
            pagination: {
                current: 1,
                pageSize: 10,
            },
        }, () => {
            this.getData()
        })
    }
    handleChange2 = (e:any) => {
        let es = e ? e : ''
        this.setState({
            account_type: es,
            pagination: {
                current: 1,
                pageSize: 10,
            },
        }, () => {
            this.getData()
        })
    }

    getData = () => {
        axios({
            url: "/getCompanyListSystem",
            method: "post",
            data: {
                pageNo: this.state.pagination.current,
                pageSize: this.state.pagination.pageSize,
                auth_account_status: this.state.auth_account_status,
                account_type: this.state.account_type,
            }
        }).then((res:any) => {
            if (res && res.code === 200) {
                this.setState({
                    dataSource: res.data.list,
                    pagination: {
                        ...this.state.pagination,
                        total: res.data.total
                      },
                })
            }
        });

    }
    onShowSizeChange = (pagination:any) => {
        this.setState({
            pagination
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
                fixed:'left'
            },
            {
                title: '联系人姓名',
                dataIndex: 'concat_name',
            },
            {
                title: '联系人电话',
                dataIndex: 'tel',
            },
            {
                title: '注册时间',
                dataIndex: 'register_time',
            },
            {
                title: '审核时间',
                dataIndex: 'verify_time',
            },
            {
                title: '禁用时间',
                dataIndex: 'disable_time',
            },
            {
                title: '复用时间',
                dataIndex: 'multiplex_time',
            },
            {
                title: '电子邮箱',
                dataIndex: 'mail',
            },
            {
                title: '账号类型',
                dataIndex: 'account_type',
            },
            {
                title: '省市县',
                dataIndex: 'province_id',
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
            },
            {
                title: '信用额度',
                dataIndex: 'credit_quota',
            },
            {
                title: '操作',
                dataIndex: 'auth_account_status',
                fixed:'right',
                render: (v:any, item:any, i:any) => (
                    <div>
                        <Button onClick={(e) => this.handleStatus(item)}>
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
                    <Table 
                        scroll={{ x: 2000 }}  
                        rowKey={record => record.login_id}  
                        dataSource={this.state.dataSource} 
                        columns={columns} 
                        loading={false}
                        onChange={this.onShowSizeChange}
                        // onShowSizeChange={this.onShowSizeChange}
                        pagination={this.state.pagination} />
                </div>
            </div>
        );
    }

}

class Index extends Component <any>{
    state={}
    componentDidMount() {
        this.props.dispatch({
          type: 'userInfo/changeBreadcrumb',
          payLoad: {
            breadcrumb: ['菜单1','菜单2']
          }
        })
    }
    render() {
        return (
            <div>
                <FilterTable ></FilterTable>
            </div>
          
        );
    }
}
export default connect(mapStateToProps)(Index)