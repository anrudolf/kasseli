<template>
  <router-link
    v-if="to"
    tag="div"
    role="button"
    class="h-48 flex flex-col justify-end text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    <app-image-ref :id="imageRef" />
    {{ label }}
  </router-link>
  <div
    v-else
    role="button"
    class="h-48 flex flex-col justify-end text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    <app-image-ref :id="imageRef" />
    {{ label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import appImageRef from "../components/ImageRef.vue";

export default defineComponent({
  name: "ProduktButton",
  components: {
    appImageRef,
  },
  props: {
    label: String,
    imageRef: String,
    to: [String, Object],
  },
});
</script>

<style scoped>
</style>>
