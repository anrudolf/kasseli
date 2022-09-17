<template>
  <div class="p-4">
    <div class="grid grid-cols-2">
      <div class="label preparation">Zubereitung</div>
      <div class="label ready">Bereit</div>
    </div>

    <div class="grid grid-cols-2">
      <div class="grid grid-cols-2">
        <div
          v-for="group in projections.filter((g) =>
            g.content.some((o) => o.status == OrderStatus.PREPARING)
          )"
          :key="group.serial"
          class="card preparation"
        >
          {{ group.serial }}
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="group in projections.filter((g) =>
            g.content.every((o) => o.status == OrderStatus.READY)
          )"
          :key="group.serial"
          class="card ready"
        >
          {{ group.serial }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OrderStatus } from "@/types";
import { useOrdersProjection } from "@/hooks/use-orders-projections";

const projections = useOrdersProjection();
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
