<template>
  <div class="flex justify-end items-center px-4 py-2 bg-gray-300 text-2xl">
    <div>Total: CHF</div>
    <div class="w-32 text-right">{{ price }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    price() {
      return this.$store.getters["kasse/price"].toFixed(2);
    },
  },
};
</script>