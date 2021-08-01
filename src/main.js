import Vue from "vue";
import App from "@/App";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from "@/store";
import loopSlide from "@/components/loopSlide";
import Pagination from "@/components/Pagination";

// 由于mockServer是一个模拟的数据库，没有人调用将不会运行，所以在main.js中引入让接口生效
import "@/mock/mockServer";
// 全局引入swiper样式
import "swiper/css/swiper.css";
// 引入接口函数对象
import * as API from "@/api";
// 按需引入element-ui
import { Button, MessageBox, Message, Input } from "element-ui";
// 注册组件
// element-ui组件分两种
// 注册方式一
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
// 注册方式二
// Vue.use(Button);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// 全局引入接口请求函数
// import "@/api";
// 部分引入
// import {xxx} from "@/api"

Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component("loopSlide", loopSlide);
Vue.component("Pagination", Pagination);

// 图片懒加载
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
// 配置项
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading,
  // 图片加载失败后的重试次数
  attempt: 1,
});

// 引入表单验证插件vee-validata
import "@/utils/veevalidate";

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 将将接口函数对象给Vue，不使用vuex实现数据处理
    Vue.prototype.$API = API;
  },

  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
