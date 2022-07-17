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
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import cloudSearch from "@/services/cloud-search";

const functions = getFunctions(getApp(), "europe-west1");
const code = ref("");
const res = ref("");

if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const search = async (query: string) => {
  const r = await cloudSearch.search(query);
  res.value = JSON.stringify(r);
};
</script>
