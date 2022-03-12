<template>
  <transition name="fade">
    <img v-if="entity && entity.payload" :src="entity.payload" />
  </transition>
</template>

<script lang="ts" setup>
import { ref, Ref, defineProps } from "vue";
import {
  getDocFromCache,
  getDocFromServer,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";

import { ImageRef } from "@/types";

import db from "@/services/db";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const entity: Ref<ImageRef | null> = ref(null);

const getImage = async (id: string) => {
  let snapshot: DocumentSnapshot<ImageRef>;
  try {
    snapshot = await getDocFromCache(doc(db.images, id));
  } catch (e) {
    snapshot = await getDocFromServer(doc(db.images, id));
  }

  if (snapshot.exists()) {
    entity.value = snapshot.data();
  }
};

if (props.id) {
  getImage(props.id);
}
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
