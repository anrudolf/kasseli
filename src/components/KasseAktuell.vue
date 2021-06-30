<template>
  <div class="bg-gray-300 p-2 pt-0 sm:pt-2 flex flex-col text-center">
    <div class="label">Aktueller Artikel</div>
    <div class="relative flex-1 bg-white flex justify-center items-center">
      <div class="w-full absolute truncate text-3xl">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useKasseStore from "@/store/kasse";

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
  @apply h-6 sm:h-8 text-lg sm:text-xl font-medium;
}
</style>
