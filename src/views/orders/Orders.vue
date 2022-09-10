<template>
  <div class="p-4">
    <h1>Orders</h1>
    These be the orders
    <ul>
      <li v-for="order in sorted" :key="order.id">
        {{ order.serial }}: {{ order.product.label.de }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useOrdersStore from "@/store/orders";

const store = useOrdersStore();

const sorted = computed(() => {
  return store.items.sort((a, b) =>
    a.created > b.created ? 1 : b.created > a.created ? -1 : 0
  );
});
</script>
