import { reqSearchInfo } from "@/api";
// import { search } from 'core-js/fn/symbol'

const state = {
  searchinfo: [],
};

const actions = {
  async receiveSearch({ commit }, searchdata) {
    const result = await reqSearchInfo(searchdata);
    if (result.code === 200) {
      commit("RECEIVE_SEARCH", result.data);
    }
  },
};

const mutations = {
  RECEIVE_SEARCH(state, searchinfo) {
    state.searchinfo = searchinfo;
  },
};

const getters = {
  attrsList(state) {
    return state.searchinfo.attrsList || [];
  },
  goodsList(state) {
    return state.searchinfo.goodsList || [];
  },
  trademarkList(state) {
    return state.searchinfo.trademarkList || [];
  },
  pageinfo(state) {
    return {
      total: state.searchinfo.total,
      totalPages: state.searchinfo.totalPages,
    };
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
