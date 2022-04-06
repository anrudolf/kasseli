<template>
  <div class="bg-gray-300 pb-2 px-2 flex flex-col text-center">
    <div class="label flex justify-center items-center">Anzahl</div>
    <div class="flex-1 px-2 bg-white flex justify-between items-center">
      <button class="btn text-red-600" @click="remove">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <span class="qty">{{ quantity }}</span>
      <button class="btn text-green-900" @click="add">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import useKasseStore from "@/store/kasse";

const store = useKasseStore();

const selected = computed(() => store.selected);
const quantity = computed(() => {
  if (!selected.value) {
    return "";
  }
  return store.selected.quantity;
});

const add = () => selected.value && store.add(selected.value.code);
const remove = () => selected.value && store.remove();
</script>

<style scoped>
.btn {
  @apply p-2 rounded-md bg-gray-200 text-4xl;
}

.btn {
  height: clamp(2.5rem, 10vh, 4rem);
  width: clamp(2.5rem, 10vh, 4rem);
}

.qty {
  font-size: clamp(2rem, 7vh, 3.75rem);
  line-height: 50%;
}

.label {
  @apply font-medium;
  height: clamp(1rem, 5vh, 2rem);
  font-size: clamp(1rem, 4vh, 1.25rem);
}
</style>
