<template>
  <div class="p-1 md:p-4 max-w-2xl">
    <app-button-back to="/" replace>Zurück</app-button-back>

    <h1 class="flex mt-2">
      Bestellungen
      <button
        class="ml-auto"
        @click="
          query = '';
          search = !search;
        "
      >
        <x-icon v-if="search" class="w-6 h-6"></x-icon>
        <search-icon v-else class="w-6 h-6"></search-icon>
      </button>
    </h1>

    <div v-if="search" class="mt-1">
      <input v-model="query" class="input" placeholder="Suche..." />
    </div>

    <div class="flex flex-wrap mt-2">
      <button
        class="t-btn"
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
        <app-order-chip :num="store.processing.length"></app-order-chip>
      </button>
      <div class="border-b grow"></div>
      <button
        class="t-btn"
        :class="display == 'finished' ? 't-btn-active' : 't-btn-inactive'"
        @click="
          clearFilter();
          display = 'finished';
        "
      >
        <app-icon icon="double-check" class="icon-small inline text-blue-400">
        </app-icon>
        Fertig
        <app-order-chip :num="store.finished.length"></app-order-chip>
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
        <app-order-chip :num="store.archived.length"></app-order-chip>
      </button>
    </div>

    <div v-if="display == 'processing'" class="flex mt-2">
      <button
        class="t-btn"
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
        <app-order-chip
          :num="items.filter((i) => i.status == OrderStatus.NEW).length"
        ></app-order-chip>
      </button>
      <div class="border-b grow"></div>
      <button
        class="t-btn"
        :class="
          filter.length == 0 || filter.includes(OrderStatus.PREPARING)
            ? 't-btn-active'
            : 't-btn-inactive'
        "
        @click="toggleFilter(OrderStatus.PREPARING)"
      >
        <clock-icon class="icon-small inline text-yellow-400"> </clock-icon>
        Zubereitung
        <app-order-chip
          :num="items.filter((i) => i.status == OrderStatus.PREPARING).length"
        ></app-order-chip>
      </button>
      <div class="border-b grow"></div>

      <button
        class="t-btn"
        :class="
          filter.length == 0 || filter.includes(OrderStatus.READY)
            ? 't-btn-active'
            : 't-btn-inactive'
        "
        @click="toggleFilter(OrderStatus.READY)"
      >
        <check-icon class="icon-small inline text-green-400"> </check-icon>
        Bereit
        <app-order-chip
          :num="items.filter((i) => i.status == OrderStatus.READY).length"
        ></app-order-chip>
      </button>
    </div>

    <app-order-list
      :filter="filter"
      :items="items"
      @set-order-item-status="setOrderItemStatus"
      @set-order-status="setOrderStatus"
      @archive-order="archiveOrder"
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
  SearchIcon,
  XIcon,
} from "@heroicons/vue/outline";

import {
  setOrderItemStatus,
  setOrderStatus,
  archiveOrder,
} from "@/services/orders";

import appModal from "@/components/ui/Modal.vue";
import appIcon from "@/components/ui/Icon.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import appOrderChip from "@/components/orders/OrderChip.vue";

import appOrderList from "@/components/orders/OrderList.vue";

const store = useOrdersStore();

const filter = ref<Array<OrderStatus>>([]);
const display = ref("processing");
const orderModal = ref(false);

const search = ref(false);
const query = ref("");

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
  let items: Order[];

  switch (display.value) {
    case "processing":
      items = store.processing;
      break;
    case "finished":
      items = store.finished;
      break;
    case "archived":
      items = store.archived;
      break;
    default:
      items = [];
  }

  if (query.value) {
    const filtered = items.filter((order) => {
      const q = query.value.toLowerCase();

      if (order.serial.toLocaleLowerCase().startsWith(q)) {
        return true;
      }

      if (
        Object.values(order.content)
          .map((oi) => oi.product.label.de.toLowerCase())
          .some((label) => label.includes(q))
      ) {
        return true;
      }

      return false;
    });

    return filtered;
  }

  return items;
});
</script>

<style scoped>
.icon {
  @apply w-6 h-6;
}

.icon-small {
  @apply w-5 h-5;
}

.t-btn {
  @apply py-2 px-2 text-sm;
}

.t-btn-inactive {
  @apply border-b;
}

.t-btn-active {
  @apply border-x border-t rounded-t;
}
</style>
