<template>
  <div class="p-4 max-w-lg">
    <h1>Orders</h1>

    <div class="flex flex-wrap gap-1">
      <button
        class="btn"
        :class="filter == OrderStatus.NEW ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.NEW"
      >
        Neu
      </button>
      <button
        class="btn btn-blue"
        :class="filter == OrderStatus.PREPARING ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.PREPARING"
      >
        Zubereitung
      </button>
      <button
        class="btn btn-blue"
        :class="filter == OrderStatus.READY ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.READY"
      >
        Bereit
      </button>
      <button
        class="btn btn-blue"
        :class="filter == OrderStatus.COMPLETE ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.COMPLETE"
      >
        Abgeschlossen
      </button>
      <button
        class="btn btn-blue"
        :class="filter == OrderStatus.CANCELED ? 'btn-blue' : 'btn-white'"
        @click="filter = OrderStatus.CANCELED"
      >
        Storniert
      </button>
    </div>

    <table class="border-separate border rounded w-full">
      <tbody
        v-for="(group, i) in projections"
        v-show="group.content.some((g) => g.status == filter)"
        :key="group.serial"
        class="border rounded my-3"
        :class="i % 2 == 0 ? 'even' : 'odd'"
      >
        <tr>
          <th>{{ group.serial }}</th>
          <th class="flex gap-3 justify-end">
            <button
              @click="
                selectOrderGroup(
                  group.serial == selectedOrderGroup ? null : group.serial
                )
              "
            >
              <dots-vertical-icon class="icon"> </dots-vertical-icon>
            </button>
            <button
              @click="updateMultiStatus(group.serial, OrderStatus.PREPARING)"
            >
              <clock-icon class="icon"> </clock-icon>
            </button>
            <button @click="updateMultiStatus(group.serial, OrderStatus.READY)">
              <paper-airplane-icon class="icon transform rotate-90">
              </paper-airplane-icon>
            </button>
            <button
              @click="updateMultiStatus(group.serial, OrderStatus.COMPLETE)"
            >
              <check-icon class="icon"> </check-icon>
            </button>
          </th>
        </tr>
        <tr
          v-for="order in group.content"
          v-show="order.status == filter"
          :key="order.id"
          class="rounded"
        >
          <td>{{ order.product.label.de }}</td>
          <td class="flex gap-3 justify-end items-center">
            <button
              v-if="selectedOrderGroup == group.serial"
              @click="setOrderStatus(order.id, OrderStatus.PREPARING)"
            >
              <clock-icon class="icon"> </clock-icon>
            </button>
            <button
              v-if="selectedOrderGroup == group.serial"
              @click="setOrderStatus(order.id, OrderStatus.READY)"
            >
              <paper-airplane-icon class="icon transform rotate-90">
              </paper-airplane-icon>
            </button>
            <button
              v-if="selectedOrderGroup == group.serial"
              @click="setOrderStatus(order.id, OrderStatus.COMPLETE)"
            >
              <check-icon class="icon"> </check-icon>
            </button>
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
  PaperAirplaneIcon,
  CheckIcon,
  DotsVerticalIcon,
} from "@heroicons/vue/outline";

import appModal from "@/components/ui/Modal.vue";

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
</style>
