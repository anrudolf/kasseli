<template>
  <div
    v-if="product"
    role="button"
    class="h-48 w-48 text-center border-solid border-2 border-light-blue-500 shadow-md"
  >
    <app-image-ref
      v-if="product.data.imageRef"
      :id="product.data.imageRef"
      class="object-contain h-32 w-32"
    />
    {{ product.data.label.de }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appImageRef from "../components/ImageRef.vue";

import useFirestoreDocument from "../hooks/use-firestore-document";

export default defineComponent({
  name: "Widget",
  components: {
    appImageRef,
  },
  props: {
    type: String,
    widget: Object,
  },
  setup(props) {
    const product = useFirestoreDocument(`products/${props.widget?.id}`);

    return { product };
  },
});
</script>

<style scoped>
</style>>
