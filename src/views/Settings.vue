<template>
  <div class="p-4">
    <h1>Settings</h1>
    <router-link to="/tills" class="underline text-indigo-600"
      >Kassen</router-link
    >

    <h2 class="mt-4">Zahlungsmöglichkeiten</h2>
    <app-switch v-model="uiStore.paymentOptions.card">Karte</app-switch>
    <app-switch v-model="uiStore.paymentOptions.cash">Cash</app-switch>
    <app-switch v-model="uiStore.paymentOptions.app">App</app-switch>
  </div>
</template>

<script lang="ts">
import appSwitch from "@/components/ui/Switch.vue";

import useUiStore from "@/store/ui";

export default {
  components: {
    appSwitch,
  },
  setup() {
    const uiStore = useUiStore();

    return {
      uiStore,
    };
  },
};
</script>
