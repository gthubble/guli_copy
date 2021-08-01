import { reqOrderInfo, reqTradeInfo } from "@/api";

const state = {
  detailArray: "",
};

const actions = {
  async getOrderInfo({ commit }) {
    const result = await reqOrderInfo();
    if (result.code === 200) {
      commit("RECEIVE_ORDERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // async getTradeInfo({ commit }, { tradeNo, tradeInfo }) {
  //   const result = await reqTradeInfo(tradeNo, tradeInfo);
  //   if (result.code === 200) {
  //     commit("RECEIVE_TRADEINFO", result.data);
  //   }
  // },
};

const mutations = {
  RECEIVE_ORDERINFO(state, data) {
    state.detailArray = data;
  },
  //   RECEIVE_TRADEINFO(state,data){

  //   }
};

const getters = {
  detailArrayList(state) {
    let detail = state.detailArray || [];
    return detail.detailArrayList;
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
