import { reqCartList, reqCheck, cartSuccess, reqDelete } from "@/api";

const state = {
  shopcartInfo: [],
};

const actions = {
  async getCartList({ commit }) {
    const result = await reqCartList();
    if (result.code === 200) {
      commit("RECEIVE_CARTINFO", result.data);
    }
  },
  async addshop({ commit }, { skuId, skuNum }) {
    const result = await cartSuccess(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //   注意？？？？？？第二个参数如果写成对象，将会是解构的用法，所以参数名大小写必须一致
  async changeCheck({ commit }, { skuId, isChecked }) {
    const result = await reqCheck(skuId, isChecked);
    // console.log(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("失败"));
    }
  },

  getAllcheck({ commit, dispatch }, { isCheckedAll, cartInfoList }) {
    let promises = [];
    cartInfoList.forEach((item) => {
      if (item.isChecked === isCheckedAll) return;
      let promise = dispatch("changeCheck", {
        skuId: item.skuId,
        isChecked: isCheckedAll,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },

  async deleteOne({ commit }, skuId) {
    const result = await reqDelete(skuId);
    // console.log(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("失败"));
    }
  },
  deleteAllcheck({ commit, dispatch }, cartInfoList) {
    let promises = [];
    cartInfoList.forEach((item) => {
      if (item.isChecked) {
        let promise = dispatch("deleteOne", item.skuId);
        promises.push(promise);
      }
    });
    return Promise.all(promises);
  },
};

const mutations = {
  RECEIVE_CARTINFO(state, shopcartInfo) {
    state.shopcartInfo = shopcartInfo;
  },
};

const getters = {
  cartInfo(state) {
    let cartInfo = [];
    let shopcartInfo = state.shopcartInfo || [];
    shopcartInfo.forEach((item) => {
      cartInfo.push(item);
    });
    return cartInfo;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
