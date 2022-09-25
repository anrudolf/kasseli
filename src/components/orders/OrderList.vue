<template>
  <table class="w-full my-2">
    <tbody
      v-for="order in items"
      v-show="
        Object.values(order.content).some((o) => o.status == props.filter)
      "
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
              class="text-blue-600"
              :disabled="props.filter == OrderStatus.NEW"
              @click="updateMultiStatus(order.id, OrderStatus.NEW)"
            >
              <sparkles-icon class="icon"> </sparkles-icon>
            </button>
            <button
              class="text-blue-600"
              :disabled="props.filter == OrderStatus.PREPARING"
              @click="updateMultiStatus(order.id, OrderStatus.PREPARING)"
            >
              <clock-icon class="icon"> </clock-icon>
            </button>
            <button
              class="text-blue-600"
              :disabled="props.filter == OrderStatus.READY"
              @click="updateMultiStatus(order.id, OrderStatus.READY)"
            >
              <check-icon class="icon"> </check-icon>
            </button>
            <button
              class="text-blue-600"
              :disabled="props.filter == OrderStatus.COMPLETE"
              @click="updateMultiStatus(order.id, OrderStatus.COMPLETE)"
            >
              <app-icon class="icon" icon="double-check"> </app-icon>
            </button>
          </div>
        </th>
      </tr>
      <tr
        v-for="item in order.content"
        v-show="item.status == props.filter"
        :key="item.idx"
        class="border"
      >
        <td>{{ item.product.label.de }}</td>
        <td>
          <div
            v-if="selectedOrder == order.serial"
            class="flex gap-3 justify-end"
          >
            <button
              :disabled="props.filter == OrderStatus.NEW"
              @click="updateSingleStatus(order.id, item.idx, OrderStatus.NEW)"
            >
              <sparkles-icon class="icon"> </sparkles-icon>
            </button>
            <button
              :disabled="props.filter == OrderStatus.PREPARING"
              @click="
                updateSingleStatus(order.id, item.idx, OrderStatus.PREPARING)
              "
            >
              <clock-icon class="icon"> </clock-icon>
            </button>
            <button
              :disabled="props.filter == OrderStatus.READY"
              @click="updateSingleStatus(order.id, item.idx, OrderStatus.READY)"
            >
              <check-icon class="icon"> </check-icon>
            </button>
            <button
              :disabled="props.filter == OrderStatus.COMPLETE"
              @click="
                updateSingleStatus(order.id, item.idx, OrderStatus.COMPLETE)
              "
            >
              <app-icon icon="double-check" class="icon"> </app-icon>
            </button>
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

import appIcon from "@/components/ui/Icon.vue";

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
    e: "updateOrderItemStatus",
    v: { id: string; items: number | number[]; status: OrderStatus }
  );
}>();

const selectedOrder = ref<string | null>(null);

const selectOrder = (id: string | null) => {
  selectedOrder.value = id;
};

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
