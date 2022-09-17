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
      <button
        class="btn border-none"
        :class="
          filter == OrderStatus.CANCELED ? 'btn-gray' : 'btn-gray-secondary'
        "
        @click="filter = OrderStatus.CANCELED"
      >
        <trash-icon class="icon-small inline"> </trash-icon>
        Storniert
      </button>
    </div>

    <table class="w-full my-2">
      <tbody
        v-for="group in projections"
        v-show="group.content.some((o) => o.status == filter)"
        :key="group.serial"
        class="border-2 border-blue-300"
      >
        <tr class="border bg-blue-100">
          <th class="flex items-center">
            <button class="mr-2 text-red-400">
              <trash-icon class="icon"></trash-icon>
            </button>
            <span class="pt-0.5">{{ group.serial }}</span>
          </th>
          <th style="width: 0px">
            <div class="flex gap-3 justify-end">
              <button
                @click="
                  selectOrderGroup(
                    group.serial == selectedOrderGroup ? null : group.serial
                  )
                "
              >
                <dots-vertical-icon class="icon text-green-500">
                </dots-vertical-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.NEW"
                @click="updateMultiStatus(group.serial, OrderStatus.NEW)"
              >
                <sparkles-icon class="icon"> </sparkles-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.PREPARING"
                @click="updateMultiStatus(group.serial, OrderStatus.PREPARING)"
              >
                <clock-icon class="icon"> </clock-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.READY"
                @click="updateMultiStatus(group.serial, OrderStatus.READY)"
              >
                <check-icon class="icon"> </check-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.COMPLETE"
                @click="updateMultiStatus(group.serial, OrderStatus.COMPLETE)"
              >
                <app-icon class="icon" icon="double-check"> </app-icon>
              </button>
            </div>
          </th>
        </tr>
        <tr
          v-for="order in group.content"
          v-show="order.status == filter"
          :key="order.id"
          class="border"
        >
          <td>{{ order.product.label.de }}</td>
          <td>
            <div
              v-if="selectedOrderGroup == group.serial"
              class="flex gap-3 justify-end"
            >
              <button
                :disabled="filter == OrderStatus.NEW"
                @click="setOrderStatus(order.id, OrderStatus.NEW)"
              >
                <sparkles-icon class="icon"> </sparkles-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.PREPARING"
                @click="setOrderStatus(order.id, OrderStatus.PREPARING)"
              >
                <clock-icon class="icon"> </clock-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.READY"
                @click="setOrderStatus(order.id, OrderStatus.READY)"
              >
                <check-icon class="icon"> </check-icon>
              </button>
              <button
                :disabled="filter == OrderStatus.COMPLETE"
                @click="setOrderStatus(order.id, OrderStatus.COMPLETE)"
              >
                <app-icon icon="double-check" class="icon"> </app-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import useOrdersStore from "@/store/orders";
import { setOrderStatus, setMultiOrderStatus } from "@/services/order";
import { OrderStatus } from "@/types";
import {
  ClockIcon,
  CheckIcon,
  DotsVerticalIcon,
  XIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/vue/outline";

import appModal from "@/components/ui/Modal.vue";
import appIcon from "@/components/ui/Icon.vue";

import { useOrdersProjection } from "@/hooks/use-orders-projections";

import { OrderGroup } from "@/types";

const store = useOrdersStore();

const filter = ref(OrderStatus.NEW);
const orderModal = ref(false);
const selectedOrderGroup = ref<string | null>(null);

const selectOrderGroup = (id: string | null) => {
  selectedOrderGroup.value = id;
};

const updateMultiStatus = (serial: string, status: OrderStatus) => {
  const ids: string[] = [];
  const group = projections.value.find((g) => g.serial == serial);
  if (!group) {
    return;
  }

  group.content.forEach((order) => {
    if (order.status == filter.value) {
      ids.push(order.id);
    }
  });

  setMultiOrderStatus(ids, status);
};

const sorted = computed(() => {
  return store.items
    .filter((i) => i.status == filter.value)
    .sort((a, b) =>
      a.created > b.created ? 1 : b.created > a.created ? -1 : 0
    );
});

const projections = useOrdersProjection();
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
