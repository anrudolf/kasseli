<template>
  <div class="my-wrapper">
    <app-produkt-button
      v-for="entity in entities"
      :key="entity.id"
      :label="entity.label.de"
      :image="entity.image"
      @click="(ev) => router.push(`/widget-group?id=${entity.id}`)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appProduktButton from "@/components/ProduktButton.vue";

export default defineComponent({
  name: "KasseWidgetGroups",
  components: {
    appProduktButton,
  },
  props: {
    entities: {
      type: Array,
    },
  },
  setup() {
    const router = useRouter();
    return { router };
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


