import { defineStore } from "pinia";
import firebase from "@/firebaseInit";
import { User } from "firebase/auth";
import { getAuth } from "firebase/auth";

const store = defineStore({
  id: "auth",
  state() {
    return {
      user: null as User | null,
    };
  },
  actions: {
    bindUser() {
      return new Promise<void>((resolve, reject) => {
        getAuth(firebase).onAuthStateChanged(async (user) => {
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
