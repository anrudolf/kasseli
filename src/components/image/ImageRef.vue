<template>
  <transition name="fade">
    <img v-if="entity && entity.payload" :src="entity.payload" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, Ref } from "vue";
import useFirestoreDocument from "../../hooks/use-firestore-document";

import { ImageRef } from "@/types";

export default defineComponent({
  props: {
    id: { type: String as PropType<string | null>, default: "" },
  },
  setup(props) {
    const show = ref(false);
    const entity: Ref<ImageRef | null> = props.id
      ? useFirestoreDocument(`images/${props.id}`, { source: "cache" })
      : ref(null);

    return { entity, show };
  },
});
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
