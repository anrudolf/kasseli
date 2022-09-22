<template>
  <div class="p-4">
    <app-button-back to="/" replace>Zurück</app-button-back>

    <div>Bestellung: {{ serial }}</div>

    <div class="my-2">
      <button
        class="btn btn-red"
        :disabled="orders.length == 0"
        @click="cancelOrders"
      >
        Stornieren
      </button>
    </div>

    <div v-if="settings.tillMode == TillMode.ORDER_AND_PAY" class="my-2">
      <button class="btn btn-blue" :disabled="orders.length == 0">
        Bezahlen
      </button>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useOnline } from "@vueuse/core";

import {
  createSerial,
  createOrders,
  setMultiOrderStatus,
} from "@/services/order";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appCard from "@/components/ui/Card.vue";

import useSettingsStore from "@/store/settings";
import { TillMode, Order, OrderStatus } from "@/types";

const settings = useSettingsStore();

const isOnline = useOnline();

const serial = ref("");
const orders = ref<Order[]>([]);

const router = useRouter();

const cancelOrders = async () => {
  const ids = orders.value.map((order) => order.id);
  await setMultiOrderStatus(ids, OrderStatus.CANCELED);
  router.replace("/");
};

if (
  settings.tillMode == TillMode.ORDER_AND_PAY_LATER ||
  settings.tillMode == TillMode.ORDER_AND_PAY
) {
  const issueSerial = async () => {
    const nextSerial = await createSerial();
    serial.value = nextSerial;
    orders.value = await createOrders(nextSerial);
  };
  issueSerial();
}
</script>
<style scoped></style>
