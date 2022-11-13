<template>
  <div class="p-4 max-w-md">
    <h1>Debug</h1>
    <h2>Cloud search</h2>
    <label>Code</label>
    <input v-model="code" class="input" />
    <button class="btn btn-blue" @click="search(code)">GO</button>
    {{ res }}
    <h2 class="mt-4">Animation</h2>
    <button class="btn btn-blue" @click="hide = !hide">Hide</button>

    <div class="flex justify-between">
      <h3 class="bg-blue-100">Bezahlung</h3>

      <app-icon
        v-show="!hide"
        icon="check-circle"
        class="w-16 h-16 text-green-500 splash"
      />
    </div>
    <div class="p-4">Another row</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import appIcon from "@/components/ui/Icon.vue";

import cloudSearch from "@/services/cloud-search";

const functions = getFunctions(getApp(), "europe-west1");
const code = ref("");
const res = ref("");
const hide = ref(false);

if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const search = async (query: string) => {
  const r = await cloudSearch.search(query);
  res.value = JSON.stringify(r);
};
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes splash {
  from {
    left: -300px;
    opacity: 0;
    transform: scale(6, 6);
  }
  to {
    top: 0px;
    left: 0;
    transform: scale(1, 1);
    opacity: 1;
  }
}

.splash {
  position: relative;
  animation-name: splash;
  animation-duration: 0.6s;
  animation-iteration-count: 1;
}
</style>
