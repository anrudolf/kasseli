// not used for now...

const createInitialState = () => ({
  routerViewKey: 0,
});

const initialState = createInitialState();

const getters = {
  routerViewKey: (state) => state.routerViewKey,
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  forceRouterViewRedraw({ commit }) {
    console.log("forceRouterViewRedraw");
    commit("INCREMENT_ROUTER_VIEW_KEY");
  },
};

const mutations = {
  RESET(state) {
    Object.assign(state, createInitialState());
  },
  INCREMENT_ROUTER_VIEW_KEY(state) {
    state.routerViewKey = state.routerViewKey + 1;
    console.log("state.routerViewKey:", state.routerViewKey);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
