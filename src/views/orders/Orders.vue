<template>
  <div class="p-4 max-w-2xl">
    <h1>Bestellungen</h1>

    <div class="flex flex-wrap mt-2">
      <button class="btn border-none" @click="display = 'processing'">
        <sparkles-icon class="icon-small inline"> </sparkles-icon>
        Neu
      </button>
      <button class="btn border-none" @click="display = 'processing'">
        <clock-icon class="icon-small inline"> </clock-icon>
        Zubereitung
      </button>
      <button class="btn border-none" @click="display = 'processing'">
        <check-icon class="icon-small inline"> </check-icon>
        Bereit
      </button>
      <button
        class="btn border-none"
        :class="display == 'finished' ? 'btn-blue' : 'btn-white'"
        @click="display = 'finished'"
      >
        <app-icon icon="double-check" class="icon-small inline"> </app-icon>
        Fertig
      </button>
      <button
        class="btn border-none"
        :class="display == 'archived' ? 'btn-gray' : 'btn-gray-secondary'"
        @click="display = 'archived'"
      >
        <trash-icon class="icon-small inline"> </trash-icon>
        Archiv
      </button>
    </div>

    <app-order-list
      :filter="filter"
      :items="items"
      @set-order-item-status="updateOrderItemsStatus"
    ></app-order-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import useOrdersStore from "@/store/orders";
import { OrderStatus, Order } from "@/types";
import {
  ClockIcon,
  CheckIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/vue/outline";
import { setOrderItemStatus } from "@/services/orders";

import appModal from "@/components/ui/Modal.vue";
import appIcon from "@/components/ui/Icon.vue";

import appOrderList from "@/components/orders/OrderList.vue";

const store = useOrdersStore();

const filter = ref(OrderStatus.NEW);
const display = ref("processing");
const orderModal = ref(false);

const items = computed(() => {
  if (display.value == "processing") {
    return store.processing;
  }

  if (display.value == "finished") {
    return store.finished;
  }

  if (display.value == "archived") {
    return store.archived;
  }

  return [] as Order[];
});

const updateOrderItemsStatus = ({
  id,
  items,
  status,
}: {
  id: string;
  items: number | number[];
  status: OrderStatus;
}) => {
  setOrderItemStatus(id, items, status);
};
</script>

<style scoped>
.icon {
  @apply w-6 h-6;
}

.icon-small {
  @apply w-5 h-5;
}
</style>
