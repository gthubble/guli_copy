// import token from "@/store/token";
// import { search } from 'core-js/fn/symbol'
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

const originalpush = VueRouter.prototype.push;
const originalreplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    return originalpush.call(this, location).catch(() => {});
  } else {
    return originalpush.call(this, location, onResolved, onRejected);
  }
};
VueRouter.prototype.replace = function(location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    return originalreplace.call(this, location).catch(() => {});
  } else {
    return originalreplace.call(this, location, onResolved, onRejected);
  }
};

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 全局解析守卫，在路由导航（匹配路由）过程中调用，然后拦截路由跳转
router.beforeResolve(async (to, from, next) => {
  // 如果用户曾经登陆过，token就会有值
  let token = store.state.user.token;
  // 如果用户
  let userInfo = store.state.user.userInfo.name;
  // 由于路由独享守卫作用于匹配路由前，组件内守卫和异步组件创建之后，而使用路由前置守卫作用于
  // 匹配路由前（调用时间在路由独享守卫之前），所以使用全局解析守卫，当路由前置守卫使用完了REFRESH_VALUE过后再删除
  sessionStorage.removeItem("REFRESH_VALUE");
  //
  if (token) {
    if (to.path === "/login") {
      next("/");
    } else {
      if (userInfo) {
        next();
      } else {
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          store.dispatch("getLogOut");
          next();
        }
      }
    }
  } else {
    // 保存要跳转的目标地址
    let target = to.path;
    // 判断未登录时跳转界面是不是去支付等相关页面
    // indexOf()用于判断字符串中是否包含要检测的目标字符串，找到了返回的是下标，找不到时返回的是-1，若检测的字符串时空串，则返回0
    // startsWith()用于检测是否以字符串中是否以目标字符串，返回的时true或false
    if (
      target.indexOf("/trade") !== -1 ||
      target.indexOf("/pay") !== -1 ||
      target.startsWith("/order")
    ) {
      // 将目标地址当作query参数携带到登录页，当登陆成功后跳转原本的目标地址
      next(`/login?redirect=${target}`);
    } else {
      next();
    }
  }
});

export default router;
