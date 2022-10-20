<template>
  <div class="p-1 md:p-4 max-w-2xl">
    <app-button-back to="/" replace>Zurück</app-button-back>

    <div v-if="order" class="my-2">
      <app-order-list
        :items="[order]"
        @set-order-item-status="setOrderItemStatus"
        @set-order-status="setOrderStatus"
        @archive-order="archive"
      ></app-order-list>
    </div>

    <div v-else class="my-2">
      <div class="bg-gray-200 p-4 rounded-md mb-2"></div>
      <div class="bg-gray-100 p-4 rounded-md mb-2"></div>
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

import {
  createSerial,
  createOrder,
  archiveOrder,
  setOrderStatus,
  setOrderItemStatus,
} from "@/services/orders";

import appOrderList from "@/components/orders/OrderList.vue";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appCard from "@/components/ui/Card.vue";

import useSettingsStore from "@/store/settings";
import useKasseStore from "@/store/kasse";
import useOrderStore from "@/store/orders";
import { TillMode } from "@/types";
import { computed } from "@vue/reactivity";

const settings = useSettingsStore();
const kasse = useKasseStore();
const orders = useOrderStore();

const isOnline = useOnline();

const serial = ref("");
const orderId = ref("");

const order = computed(() => {
  if (!orderId.value) {
    return null;
  }

  return orders.item(orderId.value);
});

const router = useRouter();

const archive = async (id: string) => {
  archiveOrder(id);
  router.replace("/");
};

if (kasse.items.length > 0) {
  const issueSerialAndCreateOrder = async () => {
    const nextSerial = await createSerial();
    serial.value = nextSerial;
    const newOrder = await createOrder(nextSerial);
    const { id } = newOrder;
    orderId.value = id;
    kasse.$reset();
  };
  issueSerialAndCreateOrder();
}
</script>
<style scoped></style>
