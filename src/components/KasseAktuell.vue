<template>
  <div class="bg-gray-300 p-2 flex flex-col text-center">
    <div class="label">Aktueller Artikel</div>
    <div class="flex-1 px-2 bg-white flex justify-center items-center">
      <span class="text-3xl">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.getters["kasse/selected"];
    },
    label() {
      if (!this.item) {
        return "";
      }
      const label = this.item?.product?.label?.de;
      return label || "???";
    },
  },
};
</script>

<style scoped>
.btn {
  @apply w-16 p-2 rounded-md bg-gray-200 text-4xl;
}

.label {
  @apply h-8 text-xl font-medium;
}
</style>
