<template>
  <div class="p-1 md:p-4 max-w-2xl">
    <!-- Navigate to root if successful, otherwise go back 1 -->
    <app-button-back v-if="store.success" to="/">Zurück</app-button-back>
    <app-button-back v-else>Zurück</app-button-back>

    <div class="mt-4 flex items-center justify-between">
      <div>
        <h1>Bezahlung</h1>
        <div class="text-gray-800">
          {{ store.success ? "Erfolgreich" : "Abgelehnt" }}
        </div>
      </div>
      <div v-if="store.success">
        <router-link to="/">
          <div class="cursor-pointer">
            <div class="flex justify-center">
              <app-icon icon="check-circle" class="w-16 h-16 text-green-500" />
            </div>
          </div>
        </router-link>
      </div>
      <div v-else>
        <button @click="goBack">
          <div class="cursor-pointer">
            <div class="flex justify-center">
              <exclamation-icon
                class="h-16 w-16 text-red-500"
              ></exclamation-icon>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div class="row bg-gray-300 mt-4">
      <span>Total</span>
      <span>{{ store.price.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Bezahlt</span>
      <span>{{ store.paid.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Rückgeld</span>
      <span>{{ store.change.toFixed(2) }} CHF</span>
    </div>

    <template v-if="store.success && hasOrder">
      <h1 class="mt-8">Bestellung</h1>

      <div class="mt-4 flex justify-between">
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
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from "vue";
import { useRouter } from "vue-router";

import { createReceipt } from "@/services/receipts";

import useCheckoutStore from "@/store/checkout";
import useKasseStore from "@/store/kasse";
import useSettingsStore from "@/store/settings";
import useOrderStore from "@/store/orders";

import { TillMode } from "@/types";

import {
  createSerial,
  createOrder,
  archiveOrder,
  setOrderStatus,
  setOrderItemStatus,
} from "@/services/orders";

import { ViewListIcon, PlusIcon, ExclamationIcon } from "@heroicons/vue/solid";

import appOrderList from "@/components/orders/OrderList.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";
import appIcon from "@/components/ui/Icon.vue";

const router = useRouter();

const store = useCheckoutStore();
const kasse = useKasseStore();
const settings = useSettingsStore();
const orders = useOrderStore();

const paymentMethod = { cash: "Bargeld", card: "Karte", app: "App" };

const serial = ref("");
const orderId = ref("");

const goBack = () => {
  router.go(-1);
};

const archive = async (id: string) => {
  archiveOrder(id);
  router.replace("/");
};

const hasOrder = computed(() => {
  if (
    settings.tillMode == TillMode.ORDER_AND_PAY_LATER ||
    settings.tillMode == TillMode.ORDER_AND_PAY
  ) {
    return true;
  }

  return false;
});

const order = computed(() => {
  if (!orderId.value) {
    return null;
  }

  return orders.item(orderId.value);
});

const process = async () => {
  if (!store.success) {
    return;
  }

  createReceipt();

  if (hasOrder.value && kasse.items.length > 0) {
    const nextSerial = await createSerial();
    serial.value = nextSerial;
    const newOrder = await createOrder(nextSerial);
    const { id } = newOrder;
    orderId.value = id;
  }

  kasse.$reset();
};

process();
</script>

<style scoped>
.row {
  @apply flex justify-between text-xl p-1 px-2;
}
</style>
