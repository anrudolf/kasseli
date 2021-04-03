const createInitialState = () => ({
  menu: false,
});

const initialState = createInitialState();

const getters = {
  menu: (state) => state.menu,
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  openMenu({ commit }) {
    const nav = document.getElementById("myNav");
    if (nav) {
      nav.style.width = "100%";
    }
    commit("SET_MENU", true);
  },
  closeMenu({ commit }) {
    const nav = document.getElementById("myNav");
    if (nav) {
      nav.style.width = "0%";
    }
    commit("SET_MENU", false);
  },
};

const mutations = {
  RESET(state) {
    Object.assign(state, createInitialState());
  },
  SET_MENU(state, menu) {
    state.menu = menu;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
