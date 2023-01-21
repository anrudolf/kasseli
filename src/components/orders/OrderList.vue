<template>
  <table class="w-full my-2">
    <app-modal
      v-model="showArchiveModal"
      :title="`Bestellung ${selectedOrder?.serial}`"
      show-confirm
      show-cancel
      @confirm="archiveToggleSelectedOrder()"
    >
      <div v-if="selectedOrder?.archived">
        Diese Bestellung wiederherstellen?
      </div>
      <div v-else>Diese Bestellung archivieren?</div>
    </app-modal>
    <tbody
      v-for="order in items"
      v-show="filter.length == 0 || filter.includes(order.status)"
      :key="order.id"
      class="border-2 border-blue-300"
    >
      <tr class="border bg-blue-100">
        <th class="flex items-center">
          <button
            class="mr-2 text-gray-400"
            @click="
              selectedOrder = order;
              showArchiveModal = true;
            "
          >
            <trash-icon v-if="!order.archived" class="icon"></trash-icon>
            <archive-box-x-mark-icon
              v-else
              class="icon"
            ></archive-box-x-mark-icon>
          </button>
          <span class="pt-0.5">{{ order.serial }}</span>
        </th>
        <th style="width: 0px">
          <div class="flex gap-3 justify-end">
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
  TrashIcon,
  ArchiveBoxXMarkIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";

import { Order, OrderStatus } from "@/types";

import appIcon from "@/components/ui/Icon.vue";
import appModal from "@/components/ui/Modal.vue";
import appOrderProgressBar from "./OrderProgressBar.vue";

const props = defineProps({
  filter: {
    type: Array as PropType<Array<OrderStatus>>,
    default: () => [],
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
  (e: "set-order-status", v: { id: string; status: OrderStatus });
  (e: "archive-order-toggle", v: string);
}>();

const selectedOrder = ref<Order | null>(null);

const setOrderStatus = (id: string, status: OrderStatus) => {
  emit("set-order-status", { id, status });
};

const showArchiveModal = ref(false);

const archiveToggleSelectedOrder = () => {
  showArchiveModal.value = false;

  const order = selectedOrder.value;
  if (!order) {
    return;
  }
  emit("archive-order-toggle", order.id);
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
