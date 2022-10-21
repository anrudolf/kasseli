<template>
  <div class="p-1 md:p-4 max-w-2xl">
    <app-button-back to="/" replace>Zurück</app-button-back>

    <h1 class="my-2">Bestellung</h1>

    <div class="my-2 flex justify-between">
      <router-link class="btn btn-blue inline-block" :to="{ name: 'orders' }">
        <div class="flex items-center">
          <view-list-icon class="inline w-5 h-5 mr-1.5"></view-list-icon>
          Alle anzeigen
        </div>
      </router-link>
      <router-link class="btn btn-green inline-block" to="/">
        <div class="flex items-center">
          <plus-icon class="inline w-5 h-5 mr-1.5"></plus-icon>
          Neue Bestellung
        </div>
      </router-link>
    </div>

    <div v-if="order" class="my-2">
      <app-order-list
        :items="[order]"
        @set-order-item-status="setOrderItemStatus"
        @set-order-status="setOrderStatus"
        @archive-order="archive"
      ></app-order-list>
    </div>

    <div v-else class="my-2 animate-pulse">
      <div class="bg-gray-200 p-4 rounded-md mb-2"></div>
      <div class="bg-gray-100 p-4 rounded-md mb-2"></div>
    </div>

    <div v-if="settings.tillMode == TillMode.ORDER_AND_PAY_LATER" class="my-2">
      <button class="btn btn-blue" :disabled="!order">TODO: Bezahlen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ViewListIcon, PlusIcon } from "@heroicons/vue/solid";

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
