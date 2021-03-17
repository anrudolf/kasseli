const createInitialState = () => ({
  items: [],
  selectedIndex: 0,
});

// item: {code, amount, product, price}
// code: string which was used to determine product
// quantity: number
// product: product from database
// price: determined price from database (or code if template)

const initialState = createInitialState();

const getters = {
  items: (state) => state.items,
  selected: (state) => state.items[state.selectedIndex],
  price: (state) => {
    return state.items
      .map((i) => i.quantity * i.price)
      .reduce((sum, x) => sum + x, 0);
  },
  hasItems: (state) => state.items.length > 0,
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
      commit("SET_ITEMS", items);
      commit("SET_SELECTED_INDEX", items.length - 1);
      return;
    }

    const items = [...state.items, item];
    commit("SET_ITEMS", items);
    commit("SET_SELECTED_INDEX", items.length - 1);
  },
  remove({ state, commit }) {
    const item = state.items[state.selectedIndex];
    const quantity = item.quantity - 1;

    const items = [...state.items];
    if (quantity <= 0) {
      items.splice(this.selectedIndex, 1);
      commit("SET_SELECTED_INDEX", items.length - 1);
      commit("SET_ITEMS", items);
      return;
    }

    items[state.selectedIndex].quantity = quantity;
    commit("SET_ITEMS", items);
  },
  select({ commit }, index) {
    commit("SET_SELECTED_INDEX", index);
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
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_SELECTED_INDEX(state, index) {
    state.selectedIndex = index;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
