<template>
  <div class="p-4">
    <h1>Create an Account</h1>
    <div class="flex flex-col space-y-3">
      <input v-model="email" type="text" placeholder="Email" class="input" />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
      />

      <button class="btn btn-blue" @click="register">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/auth";

import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const router = useRouter(); // get a reference to our vue router
const register = () => {
  firebase
    .auth() // get the auth api
    .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/profile");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
