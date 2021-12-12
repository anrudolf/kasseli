<template>
  <div class="p-4">
    <h1>Settings</h1>
    <router-link to="/tills" class="underline text-indigo-600"
      >Kassen</router-link
    >

    <h2 class="mt-4">Zahlungsmöglichkeiten</h2>
    <app-switch v-model="paymentOptions.card.enabled">Karte</app-switch>
    <app-switch v-model="paymentOptions.cash.enabled">Cash</app-switch>
    <app-switch v-model="paymentOptions.app.enabled">App</app-switch>

    <h2>Has payment options</h2>
    {{ hasPaymentOptions }}
  </div>
</template>

<script lang="ts">
import { computed } from "vue";

import appSwitch from "@/components/ui/Switch.vue";

import useUiStore from "@/store/ui";

export default {
  components: {
    appSwitch,
  },
  setup() {
    const uiStore = useUiStore();

    const { paymentOptions } = uiStore;
    const hasPaymentOptions = computed(() => uiStore.hasPaymentOptions);

    return {
      paymentOptions,
      hasPaymentOptions,
    };
  },
};
</script>
