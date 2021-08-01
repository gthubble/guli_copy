// 功能与ajax.js一样，
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const service = axios.create({
  // 路径是mock请求路径
  baseURL: "/mock",
  timeout: 20000,
});

service.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    alert("请求出错", +error.message || "未知错误");
    return new Promise(() => {});
  }
);
export default service;
