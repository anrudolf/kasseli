<template>
  <div class="p-4">
    <div class="grid grid-cols-2">
      <div class="label preparation">Zubereitung</div>
      <div class="label ready">Bereit</div>
    </div>

    <div class="grid grid-cols-2">
      <div class="grid grid-cols-2">
        <div
          v-for="order in store.items.filter((order) =>
            Object.values(order.content).some(
              (item) => item.status == OrderStatus.PREPARING
            )
          )"
          :key="order.id"
          class="card preparation"
        >
          {{ order.serial }}
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="order in store.items.filter((order) =>
            Object.values(order.content).every(
              (o) => o.status == OrderStatus.READY
            )
          )"
          :key="order.id"
          class="card ready"
        >
          {{ order.serial }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OrderStatus } from "@/types";

import useStore from "@/store/orders";

const store = useStore();
</script>

<style scoped>
.label {
  @apply m-2
          text-2xl
          font-bold
          rounded
          h-12
          flex
          justify-center
          items-center;
}

.card {
  @apply h-12 m-2 flex justify-center items-center rounded font-bold text-xl;
}

.preparation {
  @apply bg-yellow-300;
}

.ready {
  @apply bg-green-300;
}
</style>
