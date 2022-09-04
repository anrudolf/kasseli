<template>
  <div class="p-4">
    <app-button-back>Zurück</app-button-back>

    <div v-if="settings.tillMode == TillMode.ORDER_AND_PAY_LATER">
      <div>Bestellung: {{ serial }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useOnline } from "@vueuse/core";

import { createSerial, createOrders } from "@/services/order";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appCard from "@/components/ui/Card.vue";

import useSettingsStore from "@/store/settings";
import { TillMode } from "@/types";

const settings = useSettingsStore();

const isOnline = useOnline();

const serial = ref("");

if (settings.tillMode == TillMode.ORDER_AND_PAY_LATER) {
  const issueSerial = async () => {
    const nextSerial = await createSerial();
    serial.value = nextSerial;
    await createOrders(nextSerial);
  };
  issueSerial();
}
</script>
<style scoped></style>
