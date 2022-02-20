<template>
  <div class="p-4">
    <app-button-back>Zurück</app-button-back>

    <div class="mt-4 flex gap-4 flex-wrap">
      <app-card
        v-if="settingsStore.paymentOptions.card.enabled"
        label="Karte"
        to="/checkout/card"
        image-asset="kreditkarten.jpg"
        contain
      />
      <app-card
        v-if="settingsStore.paymentOptions.cash.enabled"
        label="Bar"
        to="/checkout/cash"
        image-asset="CHF_note_20_front.jpg"
        contain
      />
      <app-card
        v-if="isOnline && settingsStore.paymentOptions.app.enabled"
        label="App"
        to="/checkout/app"
      >
        <div class="p-5"><device-mobile-icon class="text-green-500" /></div
      ></app-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useOnline } from "@vueuse/core";
import { DeviceMobileIcon } from "@heroicons/vue/outline";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appCard from "@/components/ui/Card.vue";

import useSettingsStore from "@/store/settings";

const settingsStore = useSettingsStore();

const isOnline = useOnline();
</script>
<style scoped></style>
