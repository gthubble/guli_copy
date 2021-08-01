// **************这是一个接口请求函数文件

// 引入改写后的axios，并给暴露出的实例对象命名
import request from "./ajax";

// home页导航栏请求接口函数
export const reqCategoryList = () => {
  return request({
    url: "/get/product/getBaseCategoryList",
    method: "get",
  });
};

// 搜索页请求接口函数
export const reqSearchInfo = (searchdata) => {
  return request({
    url: "/post/list",
    method: "post",
    data: searchdata,
  });
};

// 详情页请求接口函数
export const reqDetailInfo = (skuId) => {
  return request({
    url: `/get/item/${skuId}`,
    method: "get",
  });
};

// 成功添加购物车
export const cartSuccess = (skuId, skuNum) => {
  return request({
    url: `/post/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
    data: { skuId, skuNum },
  });
};

// 请求购物车接口
export const reqCartList = () => {
  return request({
    url: "/get/cart/cartList",
    method: "get",
  });
};

// 单选按钮接口
export const reqCheck = (skuId, ischecked) => {
  return request({
    url: `/get/cart/checkCart/${skuId}/${ischecked}`,
    method: "get",
  });
};

// 单个删除接口
export const reqDelete = (skuId) => {
  return request({
    url: `/delete/cart/deleteCart/${skuId}`,
    method: "delete",
    data: { skuId },
  });
};

// 获取验证码
export const reqCode = (phone) => {
  return request({
    url: `/get/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

// /post/user/passport/login
// 登录接口
export const reqLogin = (userInfo) => {
  return request({
    url: `/post/user/passport/login`,
    method: "post",
    data: userInfo,
  });
};

// 注册
export const reqRegister = (userInfo) => {
  return request({
    url: `/post/user/passport/register`,
    method: "post",
    data: userInfo,
  });
};

// 根据token获取用户信息接口
export const reqUserInfo = () => {
  return request({
    url: "/get/user/passport/auth/getUserInfo",
    method: "get",
  });
};

// 退出登录
export const reqLogOut = () => {
  return request({
    url: "/get/user/passport/logout",
    method: "get",
  });
};
// 获取用户地址
export const reqUserAdd = () => {
  return request({
    url: "/get/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};
// 获取订单号
export const reqTradeInfo = (tradeNo, tradeInfo) => {
  return request({
    url: `/post/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: tradeInfo,
  });
};
// 获取订单信息
export const reqOrderInfo = () => {
  return request({
    url: "/get/order/auth/trade",
    method: "get",
  });
};

//支付信息
export const getPayInfo = (orderNum) => {
  return request({
    url: `/get/payment/weixin/createNative/${orderNum}`,
    method: "get",
  });
};

// 支付状态
export const reqPaystatus = (orderId) => {
  return request({
    url: `/get/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

// 已付款订单列表
export const reqOrderList = (page, limit) => {
  return request({
    url: `/get/order/auth/${page}/${limit}`,
    method: "get",
  });
};

// reqOrderInfo();
// reqUserAdd();
// reqTrade();
// 引入改写后的axios，并给暴露出的实例对象命名，同时将url请求路径改成mock请求路径

import mockAjax from "@/api/mockAjax";

export const bannerData = () => {
  return mockAjax({
    url: "/banner",
    method: "get",
  });
};

export const floorData = () => {
  return mockAjax({
    url: "/floor",
    method: "get",
  });
};
