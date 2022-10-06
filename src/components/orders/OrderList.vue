<template>
  <table class="w-full my-2">
    <tbody
      v-for="order in items"
      :key="order.id"
      class="border-2 border-blue-300"
    >
      <tr class="border bg-blue-100">
        <th class="flex items-center">
          <button class="mr-2 text-red-400">
            <trash-icon class="icon"></trash-icon>
          </button>
          <span class="pt-0.5">{{ order.serial }}</span>
        </th>
        <th style="width: 0px">
          <div class="flex gap-3 justify-end">
            <button
              class="text-green-600"
              @click="
                selectOrder(order.serial == selectedOrder ? null : order.serial)
              "
            >
              <dots-vertical-icon class="icon"> </dots-vertical-icon>
            </button>
            <button
              class="rounded-full"
              :class="
                order.status == OrderStatus.NEW
                  ? 'text-white bg-orange-400'
                  : 'text-orange-400'
              "
              @click="setOrderStatus(order.id, OrderStatus.NEW)"
            >
              <sparkles-icon class="icon"> </sparkles-icon>
            </button>
            <button
              class="rounded-full"
              :class="
                order.status == OrderStatus.PREPARING
                  ? 'text-white bg-yellow-400'
                  : 'text-yellow-400'
              "
              @click="setOrderStatus(order.id, OrderStatus.PREPARING)"
            >
              <clock-icon class="icon"> </clock-icon>
            </button>
            <button
              class="rounded-full"
              :class="
                order.status == OrderStatus.READY
                  ? 'text-white bg-green-400'
                  : 'text-green-400'
              "
              @click="setOrderStatus(order.id, OrderStatus.READY)"
            >
              <check-icon class="icon"> </check-icon>
            </button>
            <button
              class="rounded-full"
              :class="
                order.status == OrderStatus.COMPLETE
                  ? 'text-white bg-blue-400'
                  : 'text-blue-400'
              "
              @click="setOrderStatus(order.id, OrderStatus.COMPLETE)"
            >
              <app-icon class="icon" icon="double-check"> </app-icon>
            </button>
          </div>
        </th>
      </tr>
      <tr v-for="item in order.content" :key="item.idx" class="border">
        <td>
          {{ item.product.label.de }}
        </td>
        <td>
          <div class="flex gap-3 justify-end">
            <app-order-progress-bar
              :id="order.id"
              :item="item"
              @set-order-item-status="(v) => emit('set-order-item-status', v)"
            ></app-order-progress-bar>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
</template>

<script lang="ts" setup>
import { defineProps, ref, PropType, defineEmits } from "vue";

import {
  ClockIcon,
  CheckIcon,
  DotsVerticalIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/vue/outline";

import { Order, OrderStatus } from "@/types";

import { setOrderStatus } from "@/services/orders";

import appIcon from "@/components/ui/Icon.vue";
import appOrderProgressBar from "./OrderProgressBar.vue";

const props = defineProps({
  filter: {
    type: Number as PropType<OrderStatus>,
    required: true,
  },
  items: {
    type: Object as PropType<Order[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (
    e: "set-order-item-status",
    v: { id: string; items: number | number[]; status: OrderStatus }
  );
}>();

const selectedOrder = ref<string | null>(null);

const selectOrder = (id: string | null) => {
  selectedOrder.value = id;
};

/*
const updateMultiStatus = (id: string, status: OrderStatus) => {
  const items: number[] = [];

  const order = props.items.find((order) => order.id == id);
  if (!order) {
    return;
  }

  Object.values(order.content).forEach((item) => {
    if (item.status == props.filter) {
      items.push(item.idx);
    }
  });

  emit("updateOrderItemStatus", { id, items, status });
};

const updateSingleStatus = (id: string, items: number, status: OrderStatus) => {
  emit("updateOrderItemStatus", { id, items, status });
};
*/
</script>

<style scoped>
td {
  @apply p-2;
}

th {
  @apply text-left p-2;
}

.even {
  @apply bg-blue-100;
}

.odd {
  @apply bg-blue-200;
}

.icon {
  @apply w-6 h-6;
}

.icon-small {
  @apply w-5 h-5;
}

button:disabled {
  opacity: 0.5;
}
</style>
