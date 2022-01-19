import { defineStore } from "pinia";
import { firebaseApp } from "@/services/firebase";
import { getAuth, onAuthStateChanged, getIdTokenResult } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const useAuth = defineStore({
  id: "auth",
  state() {
    return {
      user: {},
      token: {},
    };
  },
  actions: {
    bindUser() {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(
          auth,
          async (user) => {
            this.user = user;
            if (user) this.token = await getIdTokenResult(user);
            resolve();
          },
          reject()
        );
      });
    },
    // ...
  },
});
