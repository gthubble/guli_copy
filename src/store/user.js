import {
  reqRegister,
  reqCode,
  reqLogin,
  reqUserInfo,
  reqLogOut,
  reqUserAdd,
} from "@/api";

const state = {
  code: "",
  token: localStorage.getItem("TOKEN_VALUE"),
  userInfo: "",
  useradd: "",
};

const actions = {
  // 注册
  async getRegister({ commit }, userInfo) {
    const result = await reqRegister(userInfo);

    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 验证码
  async getCode({ commit }, phone) {
    const result = await reqCode(phone);
    if (result.code === 200) {
      commit("RECEIVE_CODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 登陆
  async getLogin({ commit }, userInfo) {
    const result = await reqLogin(userInfo);
    if (result.code === 200) {
      commit("RECEIVE_LOGIN", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 获取用户登录信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    if (result.code === 200) {
      commit("RECEUVE_USERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 清除过期token

  // 与登录功能相同，直接在路由守卫中调用退出登录
  // async clearToken({ commit }) {
  //   commit("CLEAR_TOKEN");
  // },

  // 退出登录
  async getLogOut({ commit }) {
    const result = await reqLogOut();
    if (result.code === 200) {
      commit("CLEAR_TOKEN");
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 获取用户地址
  async getUserAdd({ commit }) {
    const result = await reqUserAdd();
    if (result.code === 200) {
      commit("RECEIVE_USERADD", result.data);
    }
  },
};

const mutations = {
  RECEIVE_LOGIN(state, token) {
    state.token = token;
    localStorage.setItem("TOKEN_VALUE", token);
  },
  RECEIVE_CODE(state, code) {
    state.code = code;
  },
  RECEUVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR_TOKEN(state) {
    state.token = "";
    state.userInfo = "";
    localStorage.removeItem("TOKEN_VALUE");
  },
  RECEIVE_USERADD(state, useradd) {
    state.useradd = useradd;
  },
};

const getters = {};

export default { state, actions, mutations, getters };
