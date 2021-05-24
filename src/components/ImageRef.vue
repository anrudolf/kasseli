<template>
  <transition name="fade">
    <img v-if="entity && entity.payload" :src="entity.payload" />
  </transition>
</template>

<script>
import { ref } from "vue";
import useFirestoreDocument from "../hooks/use-firestore-document";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const show = ref(false);
    const entity = props.id
      ? useFirestoreDocument(`images/${props.id}`, { source: "cache" })
      : ref(null);

    return { entity, show };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>