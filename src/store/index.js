import { createStore } from "vuex";
import ApiRequest from "@/helpers/request";

export default createStore({
  state: {
    searchData: [],
    notFound:  false
  },
  getters: {
    getSearch(state) {
      return state.searchData
    },
    isFound(state) {
      return state.notFound
    }
  
  },
  mutations: {
    setSearch(state, payload) {
      state.searchData = payload;
    },
  },
  actions: {
    searchData(context, payload) {
      ApiRequest.get("search/" + payload).then((res) => {
       
        context.commit("setSearch", res.data.data);
         if (res.data.data.length === 0) {
          context.state.notFound = true
        } else {
          context.state.notFound = false
        }
      });
    },
  },
  modules: {},
});
