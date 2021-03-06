<template>
  <div
    v-if="entity"
    role="button"
    class="h-48 w-48 text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    <img
      :src="entity.data.image"
      v-if="entity.data.image"
      class="object-contain h-32 w-32"
    />
    {{ entity.data.label.de }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useFirestoreDocument from "../hooks/use-firestore-document";

export default defineComponent({
  name: "Widget",
  props: {
    type: String,
    widget: Object,
  },
  setup(props) {
    const { entity } = useFirestoreDocument(`products/${props.widget?.id}`);

    return { entity };
  },
});
</script>

<style scoped>
</style>>
