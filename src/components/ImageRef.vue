<template>
  <img
    v-if="entity && entity.data && entity.data.payload"
    :src="entity.data.payload"
  />
</template>

<script>
import { ref } from "vue";
import useFirestoreDocument from "../hooks/use-firestore-document";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const entity = props.id
      ? useFirestoreDocument(`images/${props.id}`)
      : ref(null);

    return { entity };
  },
};
</script>