import axios from "axios";
import { message } from "antd";

//请求拦截
axios.interceptors.request.use(
  config => {
    if (localStorage.eleToken) {
      //设置统一的请求header
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    //错误提醒

    // message.error(error.response.data);

    // 获取错误状态码
    const { status } = error.response;
    if (status == 401) {
      message
        .error("token失效 请重新登录!")
        .then(() =>
        //清除token
        localStorage.removeItem("eleToken"))
        .then(() => 
        (window.location.href = "/"));//跳转到登录页面
    }
    return Promise.reject(error);
  }
);

export default axios;
