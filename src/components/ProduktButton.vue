<template>
  <router-link
    :to="to"
    tag="div"
    class="h-48 flex flex-col justify-end text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    <img :src="image" />
    {{ label }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProduktButton",
  props: {
    label: String,
    image: String,
    to: [String, Object],
  },
});
</script>

<style scoped>
</style>>
