import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";
import utils from "../../utils";

const createInitialState = () => ({
  items: [],
});

const initialState = createInitialState();

const getters = {
  items: (state) => state.items,
  item: (state) => (code) => {
    const found = state.items.find((item) => item.id === code);
    if (found && !found.template) {
      return found;
    }

    if (utils.isTemplateConform(code)) {
      const templateCode = utils.createTemplate(code);
      const found = state.items.find((item) => item.id === templateCode);
      if (found) {
        return { ...found, price: utils.getPriceFromTemplate(code) };
      }
    }

    return null;
  },
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  init({ dispatch }) {
    useFirestoreCollectionSnapshot("products", function(snapshot) {
      const items = [];
      snapshot.forEach(function(doc) {
        items.push({ id: doc.id, ...doc.data() });
      });
      dispatch("set", items);
    });
  },
  set({ commit }, items) {
    commit("SET", items);
  },
};

const mutations = {
  RESET(state) {
    Object.assign(state, createInitialState());
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
