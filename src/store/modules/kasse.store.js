const createInitialState = () => ({
  items: [],
  selected: null,
});

// item: {code, amount, product, price}
// code: string which was used to determine product
// quantity: number
// product: product from database
// price: determined price from database (or code if template)

const initialState = createInitialState();

const getters = {
  items: (state) => state.items,
  item: (state) => state.items[state.selected],
  price: (state) => {
    return state.items
      .map((i) => i.quantity * i.price)
      .reduce((sum, x) => sum + x, 0);
  },
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  add({ state, commit, rootGetters }, code) {
    const product = rootGetters["products/item"](code);
    const item = { code, quantity: 1, product, price: product.price };

    const index = state.items.findIndex((item) => item.code === code);
    if (index > -1) {
      const quantity = state.items[index].quantity + 1;
      const items = [...state.items];
      items.splice(index, 1);
      items.push({ ...item, quantity });
      commit("SET", items);
      return;
    }

    const items = [...state.items, item];
    commit("SET", items);
    commit("SELECT", items.length - 1);
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
  SELECT(state, index) {
    state.selected = index;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
