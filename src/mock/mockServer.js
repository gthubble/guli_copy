// 引入mock插件模拟数据，mock作用：生成随机数据，拦截ajax请求
import Mock from "mockjs";
import banner from "./banner.json";
import floor from "./floor.json";

// 调用mock（）方法：第一个参数是请求路径，第二个参数是请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
