import axios from "axios";
import { message } from 'antd';
// import {getLoginUser} from "../commons";
// let env = process.env.NODE_ENV;
let baseURL  = 'http://39.98.141.127:3004'
//  创建axios实例
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 5000 // 请求超时时间
});

// 加载laoding
// let loading;
function startLoading() {
}
function endLoading() {
}

//  request拦截器
service.interceptors.request.use(
  (config:any) => {
    startLoading();
    // if (config.url.indexOf("loginSystem") == -1) {
    //   config.headers.common["Authorization"] = `Bearer ${getLoginUser().token}`;
    // }
    // if (
    //   config.url.indexOf("uploadImg") != -1 ||
    //   config.url.indexOf("/uploadTestInfo") != -1
    // ) {
    //   config.headers.common["Content-Type"] = "multipart/form-data";
    // }
    return config;
  },
  (error:any) => {
    //请求错误处理
    console.log(error);
    Promise.reject(error);
  }
);

//  response拦截器
service.interceptors.response.use(
  (response:any) => {
    //成功请求到数据
    endLoading();
    if (response.status === 200) {
      if (!response.data.err) {
        // Message({
        //     showClose: true,
        //     message: response.data.msg,
        //    type: 'success'
        //  })
        return response.data;
      } else {
        message.error(response.data.msg)
        return response.data;
      }
    } else {
      message.error(response.data.msg)
    //   Message({
    //     showClose: true,
    //     message: response.data.msg,
    //     type: "error"
    //   });
    }
  },
  (error:any) => {
    //响应错误处理console.log('error')
    let text =
      JSON.parse(JSON.stringify(error)).response.status === 404
        ? "404"
        : "网络异常，请重试";
        message.error(text)
    return Promise.reject(error);
  }
);

export default service;
