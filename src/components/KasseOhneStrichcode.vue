<template>
  <div class="my-wrapper">
    <app-produkt-button
      v-for="product in products"
      :key="product"
      :name="product"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import appProduktButton from "@/components/ProduktButton.vue";

export default defineComponent({
  name: "KasseOhneStrichcode",
  components: {
    appProduktButton,
  },
  setup(props, ctx) {
    const products = ref([
      "Kleinbrote",
      "Früchte",
      /*"Grossbrote",
      "Gemüse",
      "Süssgebäck",
      "Salzgebäck"
      */
    ]);

    return { products };
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


