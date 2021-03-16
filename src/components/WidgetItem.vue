<template>
  <div v-if="product">
    {{ product.data.label.de }}
  </div>
</template>

<script>
import useFirestoreDocument from "@/hooks/use-firestore-document";
export default {
  props: {
    id: String,
    type: String,
  },
  setup(props) {
    const product = useFirestoreDocument(`products/${props.id}`);

    return { product };
  },
};
</script>