import { reqDetailInfo } from "@/api";
// import { search } from 'core-js/fn/symbol'

const state = {
  detailInfo: [],
};

const actions = {
  async getDetailInfo({ commit }, skuId) {
    const result = await reqDetailInfo(skuId);
    if (result.code === 200) {
      commit("RECEIVE_DETAIL", result.data);
    }
  },
};

const mutations = {
  RECEIVE_DETAIL(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};
const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || [];
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || [];
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
