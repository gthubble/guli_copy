import { reqCategoryList, bannerData, floorData } from "@/api";

const state = {
  category: [],
  bannerlist: [],
  floorlist: [],
};

const actions = {
  async getcategorylist({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  async getbanner({ commit }) {
    const result = await bannerData();
    if (result.code === 200) {
      commit("GETBANNER", result.data);
    }
  },
  async getfloor({ commit }) {
    const result = await floorData();
    if (result.code === 200) {
      commit("GETFLOOR", result.data);
    }
  },
};

const mutations = {
  CATEGORYLIST(state, reqcategorylist) {
    state.category = reqcategorylist;
  },
  GETBANNER(state, bannerlist) {
    state.bannerlist = bannerlist;
  },
  GETFLOOR(state, floorlist) {
    state.floorlist = floorlist;
  },
};

const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
