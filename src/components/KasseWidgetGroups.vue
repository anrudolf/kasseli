<template>
  <div class="my-wrapper">
    <template v-for="entity in entities" :key="entity.id">
      <app-card
        v-if="!entity.hidden"
        :label="entity.label.de"
        :imageRef="entity.imageRef"
        @click="(ev) => router.push(`/widget-group?id=${entity.id}`)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appCard from "@/components/Card.vue";

export default defineComponent({
  name: "KasseWidgetGroups",
  components: {
    appCard,
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
  grid-template-columns: repeat(auto-fit, minmax(11.5rem, 1fr));
  grid-auto-rows: min-content;
}
</style>>


