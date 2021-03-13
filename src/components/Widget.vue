<template>
  <app-card
    v-if="product"
    :label="product.data.label.de"
    :imageRef="product.data.imageRef"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appCard from "../components/Card.vue";

import useFirestoreDocument from "../hooks/use-firestore-document";

export default defineComponent({
  name: "Widget",
  components: {
    appCard,
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
