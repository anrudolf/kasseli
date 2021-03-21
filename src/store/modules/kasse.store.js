const createInitialState = () => ({
  items: [],
  selectedIndex: 0,
  offset: 0,
  pageSize: 3,
});

// item: {code, quantity, product, price}
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
  displayedItems: (state) => {
    const begin = Math.max(
      state.items.length - state.pageSize - state.offset,
      0
    );
    const end = begin + state.pageSize;
    return state.items.slice(begin, end);
  },
  offset: (state) => state.offset,
  pageSize: (state) => state.pageSize,
  hasPrev: (state) => {
    const maxOffset = Math.max(state.items.length - state.pageSize, 0);
    return state.offset < maxOffset;
  },
  hasNext: (state) => state.offset > 0,
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
      commit("OFFSET_RESET");
      return;
    }

    const items = [...state.items, item];
    commit("SET_ITEMS", items);
    commit("SET_SELECTED_INDEX", items.length - 1);
    commit("OFFSET_RESET");
  },
  remove({ state, commit }) {
    const item = state.items[state.selectedIndex];
    const quantity = item.quantity - 1;

    const items = [...state.items];
    if (quantity <= 0) {
      items.splice(state.selectedIndex, 1);
      commit("SET_ITEMS", items);
      commit("SET_SELECTED_INDEX", items.length - 1);
      commit("OFFSET_RESET");
      return;
    }

    items[state.selectedIndex].quantity = quantity;
    commit("SET_ITEMS", items);
  },
  select({ commit }, index) {
    commit("SET_SELECTED_INDEX", index);
  },
  prev({ commit }) {
    commit("OFFSET_INCREMENT");
  },
  next({ commit }) {
    commit("OFFSET_DECREMENT");
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
  OFFSET_INCREMENT(state) {
    const maxOffset = Math.max(state.items.length - state.pageSize, 0);
    if (state.offset < maxOffset) {
      state.offset = state.offset + 1;
    }
  },
  OFFSET_DECREMENT(state) {
    if (state.offset > 0) {
      state.offset = state.offset - 1;
    }
  },
  OFFSET_RESET(state) {
    state.offset = 0;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
