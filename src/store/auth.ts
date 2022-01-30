import { defineStore } from "pinia";
import firebase from "@/firebaseInit";
import { User } from "firebase/auth";
import { getAuth } from "firebase/auth";

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
            console.log("logged in");
            this.uid = user.uid;
            this.email = user.email ? user.email : "";
          } else {
            console.log("not logged in");
            this.uid = "";
            this.email = "";
          }
          this.user = user;

          resolve();
        });
      });
    },
    logout() {
      getAuth(firebase).signOut();
    },
  },
});

export default store;
