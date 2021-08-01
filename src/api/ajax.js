// 二次重写axios功能
// 引入axios
import axios from "axios";
// 引入nprogress使用进度条
import NProgress from "nprogress";
// 引入进度条css样式
import "nprogress/nprogress.css";
// import store from "@/store";

const service = axios.create({
  baseURL: "/api/v2",
  timeout: 20000,
});

// 在请求开始之前拦截请求，并添加进度条
service.interceptors.request.use(
  (config) => {
    // 开启进度条
    NProgress.start();
    let token = localStorage.getItem("TOKEN_VALUE");
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 拦截响应并关闭进度条
service.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    alert("请求出错" + error.message || "未知错误");
    // 中断Promise链
    return new Promise(() => {});
  }
);

// 暴露axios实例对象service
export default service;
