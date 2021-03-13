<template>
  <img v-if="false" :src="entity.data.payload" />
  {{ entity }}
</template>

<script>
import useFirestoreDocument from "../hooks/use-firestore-document";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const entity = useFirestoreDocument(`images/${props.modelValue.value}`);

    return { entity };
  },
};
</script>