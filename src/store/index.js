import { createStore } from "vuex";

import modules from "./modules";

const createInitialState = () => ({
  items: [],
});

const actions = {
  add({ commit }, id) {
    commit("ADD", id);
  },
  remove({ commit }, id) {
    commit("REMOVE", id);
  },
};

const mutations = {
  ADD(state, id) {
    //
  },
  REMOVE(state, id) {
    //
  },
};

export default createStore({
  state: createInitialState(),
  mutations,
  actions,
  modules,
});
