import { defineStore } from "pinia";
import firebase from "@/firebaseInit";
import { User } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  waitForPendingWrites,
  clearIndexedDbPersistence,
  terminate,
} from "firebase/firestore";

import useSettingsStore from "@/store/settings";
import { initFirestore } from "@/firebaseInit";

const store = defineStore({
  id: "auth",
  state: () => ({
    user: null as User | null,
    email: "",
    uid: "",
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.user != null;
    },
  },
  actions: {
    bindUser() {
      return new Promise<void>((resolve, reject) => {
        getAuth(firebase).onAuthStateChanged(async (user) => {
          if (user) {
            this.uid = user.uid;
            this.email = user.email ? user.email : "";
          } else {
            this.uid = "";
            this.email = "";
          }
          this.user = user;

          resolve();
        });
      });
    },
    async logout(clearCache = false) {
      if (clearCache) {
        const fs = getFirestore();
        await terminate(fs);
        await clearIndexedDbPersistence(fs);
        initFirestore();
      }

      const settingsStore = useSettingsStore();
      settingsStore.clearWorkspace();
      getAuth(firebase).signOut();
    },
    logoutAndClearLocalFirestoreCache() {
      this.logout(true);
    },
  },
});

export default store;
