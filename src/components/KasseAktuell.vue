<template>
  <div class="bg-gray-300 p-2 flex flex-col text-center">
    <div class="label">Aktueller Artikel</div>
    <div class="flex-1 px-2 bg-white flex justify-center items-center">
      <span class="text-3xl">{{ label }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useKasseStore from "@/pinia/kasse";

export default defineComponent({
  setup() {
    const store = useKasseStore();

    const item = computed(() => store.selected);
    const label = computed(() => {
      if (!item.value) {
        return "";
      }
      const label = item.value.product.label.de;
      return label || "???";
    });

    return { item, label };
  },
});
</script>

<style scoped>
.btn {
  @apply w-16 p-2 rounded-md bg-gray-200 text-4xl;
}

.label {
  @apply h-8 text-xl font-medium;
}
</style>
