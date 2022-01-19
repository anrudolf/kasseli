<template>
  <h1>Profile</h1>
  <div v-if="isLoggedIn && user != null">
    Signed in
    <div>{{ user.uid }} -- {{ user.email }}</div>
  </div>
  <button class="btn btn-blue" @click="signOut">Sign out</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const user = ref<firebase.User | null>(null);

    const isLoggedIn = ref(true);
    // runs after firebase is initialized
    firebase.auth().onAuthStateChanged(function (u) {
      user.value = u;

      if (u) {
        console.log("we have a user");
        isLoggedIn.value = true; // if we have a user
      } else {
        console.log("we do not have a user");
        isLoggedIn.value = false; // if we do not
      }
    });
    const signOut = () => {
      firebase.auth().signOut();
      router.push("/signin");
    };

    return { isLoggedIn, signOut, user };
  },
});
</script>
