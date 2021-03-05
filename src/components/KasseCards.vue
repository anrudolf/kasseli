<template>
  <div class="my-wrapper">
    <app-produkt-button
      v-for="card in entities"
      :key="card.id"
      :label="card.label.de"
      :image="card.image"
      :to="`/card?id=${card.id}`"
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
    entities: {
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


