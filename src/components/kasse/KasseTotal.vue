<template>
  <div
    class="flex justify-end items-center px-4 py-2 bg-gray-300 text-xl md:text-2xl"
  >
    <div>Total: CHF</div>
    <div class="w-32 text-right">{{ price }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useKasseStore from "@/store/kasse";

export default defineComponent({
  setup() {
    const store = useKasseStore();
    return {
      price: computed(() => store.price.toFixed(2)),
    };
  },
});
</script>