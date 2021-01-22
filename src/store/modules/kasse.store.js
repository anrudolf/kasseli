const createInitialState = () => ({
  items: [],
});

const initialState = createInitialState();

const getters = {
  items: (state) => state.items,
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  add({ state, commit, rootGetters }, code) {
    const product = rootGetters["products/item"](code);
    const item = { code, amount: 1, product };

    const index = state.items.findIndex((item) => item.code === code);
    if (index > -1) {
      const amount = state.items[index].amount + 1;
      const items = [...state.items];
      items.splice(index, 1);
      items.push({ ...item, amount });
      commit("SET", items);
      return;
    }

    const items = [...state.items, item];
    commit("SET", items);
  },
  remove({ commit }, code) {
    commit("REMOVE", code);
  },
};

const mutations = {
  RESET(state) {
    Object.assign(state, createInitialState());
  },
  ADD(state, item) {
    state.items.push(item);
  },
  REMOVE(state, item) {
    //
  },
  SET(state, items) {
    state.items = items;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
