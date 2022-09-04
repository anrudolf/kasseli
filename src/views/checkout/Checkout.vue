<template>
  <div class="p-4">
    <app-button-back>Zurück</app-button-back>

    <div v-if="settings.tillMode == TillMode.ORDER_AND_PAY_LATER">
      <div>Order Serial: {{ serial }}</div>
    </div>

    <div v-else class="mt-4 flex gap-4 flex-wrap">
      <app-card
        v-if="settings.paymentOptions.card.enabled"
        label="Karte"
        to="/checkout/card"
        image-asset="kreditkarten.jpg"
        contain
      />
      <app-card
        v-if="settings.paymentOptions.cash.enabled"
        label="Bar"
        to="/checkout/cash"
        image-asset="CHF_note_20_front.jpg"
        contain
      />
      <app-card
        v-if="isOnline && settings.paymentOptions.app.enabled"
        label="App"
        to="/checkout/app"
      >
        <div class="p-5"><device-mobile-icon class="text-green-500" /></div
      ></app-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useOnline } from "@vueuse/core";
import { DeviceMobileIcon } from "@heroicons/vue/outline";

import { createSerial } from "@/services/order";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appCard from "@/components/ui/Card.vue";

import useSettingsStore from "@/store/settings";
import { TillMode } from "@/types";

const settings = useSettingsStore();

const isOnline = useOnline();

const serial = ref("");

if (settings.tillMode == TillMode.ORDER_AND_PAY_LATER) {
  const issueSerial = async () => {
    serial.value = await createSerial();
  };
  issueSerial();
}
</script>
<style scoped></style>
