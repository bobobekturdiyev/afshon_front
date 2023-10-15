import { createStore } from "vuex";
import ApiRequest from "@/helpers/request";

export default createStore({
  state: {
    searchData: [],
    notFound: false,
    isLoad:false
  },
  getters: {
    getSearch(state) {
      return state.searchData;
    },
    isFound(state) {
      return state.notFound;
    },
    isLoad(state) {
      return state.isLoad;
    },
  },
  mutations: {
    setSearch(state, payload) {
      state.searchData = payload;
    },
    setNotFound(state, payload) {
      state.notFound = payload;
    },
    setLoad(state, payload) {
      state.isLoad = payload;
    },
    
  },
  actions: {
    searchData(context, payload) {
      context.commit('setLoad' , true)
      ApiRequest.post("search/" + payload)
        .then((res) => {
        
          context.commit("setSearch", res.data);
          context.commit('setLoad' , false)
        })
        .catch((error) => {
          console.log(error);
          context.commit('setLoad' , false)
        });
    },
  },
  modules: {},
});
