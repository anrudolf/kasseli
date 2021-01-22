import { createStore } from "vuex";

const createInitialState = () => ({
  items: [],
});

const actions = {
  add({ commit }, id) {
    commit("ADD", id);
  },
};

export default createStore({
  state: createInitialState(),
  mutations: {},
  actions: {},
  modules: {},
});
