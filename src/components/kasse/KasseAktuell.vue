<template>
  <div class="bg-gray-300 pb-2 px-2 flex flex-col text-center">
    <div class="label">Aktueller Artikel</div>
    <div class="relative flex-1 bg-white flex justify-center items-center">
      <div
        class="w-full px-2 absolute truncate text-xl sm:text-2xl md:text-3xl"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import useKasseStore from "@/store/kasse";

const store = useKasseStore();

const item = computed(() => store.selected);
const label = computed(() => {
  if (!item.value) {
    return "";
  }
  const label = item.value.product.label.de;
  return label || "???";
});
</script>

<style scoped>
.btn {
  @apply w-16 p-2 rounded-md bg-gray-200 text-4xl;
}

.label {
  @apply font-medium;
  height: clamp(1rem, 5vh, 2rem);
  font-size: clamp(1rem, 4vh, 1.25rem);
}
</style>
