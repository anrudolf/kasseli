<template>
  <div
    class="
      flex
      justify-end
      items-center
      px-4
      py-2
      bg-gray-300
      app-text-responsive
    "
  >
    <div>Total: CHF</div>
    <div class="w-32 text-right">{{ price }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import useKasseStore from "@/store/kasse";

const store = useKasseStore();
const price = computed(() => store.price.toFixed(2));
</script>

<style scoped>
.app-text-responsive {
  font-size: clamp(1.125rem, 5vh, 1.5rem);
}
</style>
