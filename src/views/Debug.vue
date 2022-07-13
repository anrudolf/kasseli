<template>
  <div class="p-4 max-w-md">
    <h1>Debug</h1>
    <label>Code</label>
    <input v-model="code" class="input" />
    <button class="btn btn-blue" @click="search(code)">GO</button>
    {{ res }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { getApp } from "firebase/app";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";

const functions = getFunctions(getApp(), "europe-west1");
const code = ref("");
const res = ref("");

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const searchMigros = httpsCallable(functions, "searchMigros");

const search = (query: string) => {
  searchMigros({ query: query }).then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    const sanitizedMessage = data.message;
    res.value = sanitizedMessage;
  });
};
</script>
