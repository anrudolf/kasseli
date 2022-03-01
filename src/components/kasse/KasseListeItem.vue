<template>
  <div
    class="flex items-center h-full w-full text-xl"
    :class="{ selected: props.selected, 'bg-gray-500': props.selected }"
  >
    <div class="w-12 mr-4 text-right">{{ props.quantity }}x</div>
    <div class="w-0 flex-grow truncate">
      {{ props.label }}
    </div>
    <div class="mr-4">{{ `${(props.quantity * props.price).toFixed(2)}` }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  quantity: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  selected: {
    type: Boolean,
  },
});
</script>

<style scoped>
.selected {
  color: white;
}
</style>
