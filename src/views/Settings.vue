<template>
  <div class="p-4 max-w-lg">
    <h1 class="my-2">Settings</h1>
    <router-link to="/tills" class="link text-xl">Kassen</router-link>

    <h2 class="mt-4">Zahlungsmöglichkeiten</h2>
    <app-switch v-model="paymentOptions.card.enabled">Karte</app-switch>
    <app-switch v-model="paymentOptions.cash.enabled">Cash</app-switch>
    <app-switch v-model="paymentOptions.app.enabled">App</app-switch>

    <h2>Diverses</h2>
    <app-switch v-model="paymentHints.enabled">Zahlungstipps</app-switch>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";

import appSwitch from "@/components/ui/Switch.vue";

import useSettingsStore from "@/store/settings";

export default {
  components: {
    appSwitch,
  },
  setup() {
    const settingsStore = useSettingsStore();

    const { paymentOptions, paymentHints } = settingsStore;
    const hasPaymentOptions = computed(() => settingsStore.hasPaymentOptions);

    return {
      paymentOptions,
      paymentHints,
      hasPaymentOptions,
    };
  },
};
</script>
