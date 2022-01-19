import { defineStore } from "pinia";
import firebase from "firebase/app";
import "firebase/auth";

const store = defineStore({
  id: "auth",
  state() {
    return {
      user: null as firebase.User | null,
    };
  },
  actions: {
    bindUser() {
      return new Promise<void>((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            console.log("logged in");
          } else {
            console.log("not logged in");
          }
          this.user = user;
          resolve();
        });
      });
    },
  },
});

export default store;
