<template>
  <div class="my-wrapper">
    <app-produkt-button
      v-for="bundle in bundles"
      :key="bundle.id"
      :label="bundle.label.de"
      :image="bundle.image"
      :to="`/bundle?id=${bundle.id}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appProduktButton from "@/components/ProduktButton.vue";

export default defineComponent({
  name: "KasseOhneStrichcode",
  components: {
    appProduktButton,
  },
  props: {
    bundles: {
      type: Array,
    },
  },
});
</script>

<style scoped>
.my-wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-rows: min-content;
}
</style>>


