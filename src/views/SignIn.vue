<template>
  <div class="p-4 flex flex-col space-y-3">
    <h1>Login to Your Account</h1>
    <input v-model="email" type="text" placeholder="Email" class="input" />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="input"
    />
    <p v-if="errMsg">{{ errMsg }}</p>
    <button class="btn btn-blue" @click="signIn">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const errMsg = ref(); // ERROR MESSAGE
const router = useRouter(); // get a reference to our vue router
const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value) // THIS LINE CHANGED
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/profile"); // redirect to the feed
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>
