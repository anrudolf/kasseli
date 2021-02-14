<template>
  <div class="flex w-full text-xl">
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
  },
};
</script>