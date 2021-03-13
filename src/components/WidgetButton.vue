<template>
  <router-link
    v-if="to"
    tag="div"
    role="button"
    class="h-48 flex flex-col justify-end text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    {{ imageRef }}
    {{ label }}
  </router-link>
  <div
    v-else
    role="button"
    class="h-48 flex flex-col justify-end text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    {{ imageRef }}
    {{ label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProduktButton",
  props: {
    label: String,
    imageRef: String,
    to: [String, Object],
  },
});
</script>

<style scoped>
</style>>
