<template>
  <div class="p-4 max-w-lg">
    <h1 class="my-2">Settings</h1>
    <router-link to="/tills" class="link text-xl">Kassen</router-link>

    <h2 class="mt-4">Zahlungsmöglichkeiten</h2>
    <app-switch v-model="settings.paymentOptions.card.enabled"
      >Karte</app-switch
    >
    <app-switch v-model="settings.paymentOptions.cash.enabled">Cash</app-switch>
    <app-switch v-model="settings.paymentOptions.app.enabled">App</app-switch>

    <h2>Workspace</h2>
    <input v-model="settings.workspace" class="input" />

    <h2>Diverses</h2>
    <app-switch v-model="settings.paymentHints.enabled"
      >Zahlungstipps</app-switch
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import appSwitch from "@/components/ui/Switch.vue";

import useSettingsStore from "@/store/settings";

export default defineComponent({
  components: {
    appSwitch,
  },
  setup() {
    const settings = useSettingsStore();

    const hasPaymentOptions = computed(() => settings.hasPaymentOptions);

    return {
      settings,
      // computed
      hasPaymentOptions,
    };
  },
});
</script>
