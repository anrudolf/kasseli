<template>
  <div class="p-4 max-w-2xl">
    <h1>Bestellungen</h1>

    <div class="flex flex-wrap mt-2">
      <button
        :class="display == 'processing' ? 't-btn-active' : 't-btn-inactive'"
        @click="
          clearFilter();
          display = 'processing';
        "
      >
        <sparkles-icon class="icon-small inline text-orange-400">
        </sparkles-icon>
        <clock-icon class="icon-small inline text-yellow-400"> </clock-icon>
        <check-icon class="icon-small inline text-green-400"> </check-icon>
        Aktuell
      </button>
      <div class="border-b grow"></div>
      <button
        :class="display == 'finished' ? 't-btn-active' : 't-btn-inactive'"
        @click="
          clearFilter();
          display = 'finished';
        "
      >
        <app-icon icon="double-check" class="icon-small inline text-blue-400">
        </app-icon>
        Fertig
      </button>
      <div class="border-b grow"></div>

      <button
        class="t-btn"
        :class="display == 'archived' ? 't-btn-active' : 't-btn-inactive'"
        @click="
          clearFilter();
          display = 'archived';
        "
      >
        <trash-icon class="icon-small inline"> </trash-icon>
        Archiv
      </button>
    </div>

    <div v-if="display == 'processing'" class="flex mt-2">
      <button
        :class="
          filter.length == 0 || filter.includes(OrderStatus.NEW)
            ? 't-btn-active'
            : 't-btn-inactive'
        "
        @click="toggleFilter(OrderStatus.NEW)"
      >
        <sparkles-icon class="icon-small inline text-orange-400">
        </sparkles-icon>
        Neu
      </button>
      <div class="border-b grow"></div>
      <button
        :class="
          filter.length == 0 || filter.includes(OrderStatus.PREPARING)
            ? 't-btn-active'
            : 't-btn-inactive'
        "
        @click="toggleFilter(OrderStatus.PREPARING)"
      >
        <clock-icon class="icon-small inline text-yellow-400"> </clock-icon>
        Zubereitung
      </button>
      <div class="border-b grow"></div>

      <button
        :class="
          filter.length == 0 || filter.includes(OrderStatus.READY)
            ? 't-btn-active'
            : 't-btn-inactive'
        "
        @click="toggleFilter(OrderStatus.READY)"
      >
        <check-icon class="icon-small inline text-green-400"> </check-icon>
        Bereit
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

const filter = ref<Array<OrderStatus>>([]);
const display = ref("processing");
const orderModal = ref(false);

const clearFilter = () => {
  filter.value = [];
};

const toggleFilter = (status: OrderStatus) => {
  const idx = filter.value.indexOf(status);
  if (idx >= 0) {
    filter.value.splice(idx, 1);
  } else {
    filter.value.push(status);
  }
};

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

.t-btn-inactive {
  @apply font-bold py-2 px-4 border-b;
}

.t-btn-active {
  @apply font-bold py-2 px-4 border-x border-t rounded-t;
}
</style>
