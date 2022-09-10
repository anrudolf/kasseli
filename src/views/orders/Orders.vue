<template>
  <div class="p-4">
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

    <ul>
      <li v-for="order in sorted" :key="order.id" class="border p-1 my-1">
        <div>{{ order.serial }}: {{ order.product.label.de }}</div>
        <div class="flex flex-wrap gap-1">
          <button
            :disabled="filter == OrderStatus.NEW"
            class="btn btn-blue"
            @click="setOrderStatus(order.id, OrderStatus.NEW)"
          >
            Neu
          </button>
          <button
            :disabled="filter == OrderStatus.PREPARING"
            class="btn btn-blue"
            @click="setOrderStatus(order.id, OrderStatus.PREPARING)"
          >
            Zubereitung
          </button>
          <button
            :disabled="filter == OrderStatus.READY"
            class="btn btn-blue"
            @click="setOrderStatus(order.id, OrderStatus.READY)"
          >
            Bereit
          </button>
          <button
            :disabled="filter == OrderStatus.COMPLETE"
            class="btn btn-blue"
            @click="setOrderStatus(order.id, OrderStatus.COMPLETE)"
          >
            Abgeschlossen
          </button>
          <button
            :disabled="filter == OrderStatus.CANCELED"
            class="btn btn-blue"
            @click="setOrderStatus(order.id, OrderStatus.CANCELED)"
          >
            Storniert
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import useOrdersStore from "@/store/orders";
import { setOrderStatus } from "@/services/order";
import { OrderStatus } from "@/types";

const store = useOrdersStore();

const filter = ref(OrderStatus.NEW);

const sorted = computed(() => {
  return store.items
    .filter((i) => i.status == filter.value)
    .sort((a, b) =>
      a.created > b.created ? 1 : b.created > a.created ? -1 : 0
    );
});
</script>
