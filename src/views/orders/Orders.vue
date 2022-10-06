<template>
  <div class="p-4 max-w-2xl">
    <h1>Bestellungen</h1>

    <div class="flex flex-wrap mt-2">
      <button
        class="btn border-none"
        :class="filter == OrderStatus.NEW ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.NEW"
      >
        <sparkles-icon class="icon-small inline"> </sparkles-icon>
        Neu
      </button>
      <button
        class="btn border-none"
        :class="filter == OrderStatus.PREPARING ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.PREPARING"
      >
        <clock-icon class="icon-small inline"> </clock-icon>
        Zubereitung
      </button>
      <button
        class="btn border-none"
        :class="filter == OrderStatus.READY ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.READY"
      >
        <check-icon class="icon-small inline"> </check-icon>
        Bereit
      </button>
      <button
        class="btn border-none"
        :class="filter == OrderStatus.COMPLETE ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.COMPLETE"
      >
        <app-icon icon="double-check" class="icon-small inline"> </app-icon>
        Fertig
      </button>
      <button class="btn border-none">
        <trash-icon class="icon-small inline"> </trash-icon>
        Storniert
      </button>
    </div>

    <app-order-list
      :filter="filter"
      :items="store.processing"
      @set-order-item-status="updateOrderItemsStatus"
    ></app-order-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useOrdersStore from "@/store/orders";
import { OrderStatus } from "@/types";
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
const orderModal = ref(false);

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
