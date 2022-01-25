<template>
  <div class="max-w-md p-4 flex flex-col space-y-3">
    <h1 v-if="mode == Mode.LOGIN">Login</h1>
    <h1 v-else>Register</h1>
    <input
      v-model="email"
      type="text"
      placeholder="Email"
      class="input"
      @keyup.enter="submit"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="input"
      @keyup.enter="submit"
    />
    <input
      v-if="mode == Mode.REGISTER"
      v-model="passwordConfirmation"
      type="password"
      placeholder="Password wiederholen"
      class="input"
      @keyup.enter="submit"
    />
    <div v-if="mode == Mode.LOGIN" class="flex flex-col space-y-3">
      <button class="btn btn-blue" @click="submit">Login</button>
      <button class="btn text-gray-500" @click="mode = Mode.REGISTER">
        Register...
      </button>
    </div>
    <div v-else class="flex flex-col space-y-3">
      <button class="btn btn-blue" @click="submit">Register</button>
      <button class="btn text-gray-500" @click="mode = Mode.LOGIN">
        Login...
      </button>
    </div>

    <p
      v-if="errMsg"
      class="
        bg-red-100
        text-gray-500
        p-2
        rounded
        flex
        items-center
        justify-between
      "
    >
      <exclamation-circle-icon
        class="w-8 h-8 inline text-red-500"
      ></exclamation-circle-icon>
      {{ errMsg }}
      <button @click="errMsg = ''">
        <x-icon class="w-6 h-6 inline text-black"></x-icon>
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ExclamationCircleIcon, XIcon } from "@heroicons/vue/outline";

import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const errMsg = ref();
const router = useRouter();
const DEFAULT_REDIRECT = { name: "settings" };

enum Mode {
  LOGIN,
  REGISTER,
}

const mode = ref<Mode>(Mode.LOGIN);

const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(getAuth(), email, password)
    .then((data) => {
      router.push(DEFAULT_REDIRECT);
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "E-Mail ungültig";
          break;
        case "auth/user-not-found":
          errMsg.value = "Kein Account mit dieser Email gefunden";
          break;
        case "auth/wrong-password":
          errMsg.value = "Passwort nicht korrekt";
          break;
        default:
          errMsg.value = `Fehler: ${error.code}`;
          break;
      }
    });
};

const register = (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  if (password !== passwordConfirmation) {
    errMsg.value = "Passwörter stimmen nicht überein";
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((data) => {
      router.push(DEFAULT_REDIRECT);
    })
    .catch((error) => {
      console.log("error: ", error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "E-Mail ungültig";
          break;
        case "auth/wrong-password":
          errMsg.value = "Passwort nicht korrekt";
          break;
        case "auth/weak-password":
          errMsg.value = "Passwort ist zu schwach";
          break;
        case "auth/email-already-in-use":
          errMsg.value = "Ein Account mit dieser Email existiert bereits";
          break;
        default:
          errMsg.value = `Fehler: ${error.code}`;
          break;
      }
    });
};

const submit = () => {
  if (mode.value == Mode.LOGIN) {
    signIn(email.value, password.value);
  }

  if (mode.value == Mode.REGISTER) {
    register(email.value, password.value, passwordConfirmation.value);
  }
};
</script>
