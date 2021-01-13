<template>
  <div
    class="h-48 flex flex-col justify-end text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProduktButton",
  props: {
    name: String,
  },
});
</script>

<style scoped>
</style>>
