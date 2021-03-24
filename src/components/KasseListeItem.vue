<template>
  <div
    class="flex items-center h-full w-full text-xl"
    :class="{ selected: selected, 'bg-gray-500': selected }"
  >
    <div class="w-12 mr-4 text-right">{{ quantity }}x</div>
    <div class="flex-grow">{{ label }}</div>
    <div class="mr-4">{{ `${(quantity * price).toFixed(2)}` }}</div>
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
    },
    label: {
      type: String,
    },
    price: {
      type: Number,
    },
    selected: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.selected {
  color: white;
}
</style>