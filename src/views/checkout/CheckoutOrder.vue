<template>
  <div class="p-4">
    <app-button-back to="/" replace>Zurück</app-button-back>

    <div>Bestellung: {{ serial }}</div>

    <div class="my-2">
      <button class="btn btn-red" :disabled="!order" @click="archive">
        Stornieren
      </button>
    </div>

    <div v-if="settings.tillMode == TillMode.ORDER_AND_PAY_LATER" class="my-2">
      <button class="btn btn-blue" :disabled="!order">TODO: Bezahlen</button>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useOnline } from "@vueuse/core";

import { createSerial, createOrder, archiveOrder } from "@/services/orders";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appCard from "@/components/ui/Card.vue";

import useSettingsStore from "@/store/settings";
import useKasseStore from "@/store/kasse";
import { TillMode, Order, OrderStatus } from "@/types";

const settings = useSettingsStore();
const kasse = useKasseStore();

const isOnline = useOnline();

const serial = ref("");
const order = ref<Order | null>(null);

const router = useRouter();

const archive = async () => {
  if (!order.value) {
    return;
  }

  archiveOrder(order.value.id);
  router.replace("/");
};

if (kasse.items.length > 0) {
  const issueSerial = async () => {
    const nextSerial = await createSerial();
    serial.value = nextSerial;
    order.value = await createOrder(nextSerial);
    kasse.$reset();
  };
  issueSerial();
}
</script>
<style scoped></style>
