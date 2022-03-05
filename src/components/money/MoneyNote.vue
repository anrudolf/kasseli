<template>
  <img :src="getAssetSrc()" />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  currency: {
    type: String,
    default: "CHF",
  },
  side: {
    type: String,
    default: "front",
  },
  amount: {
    type: Number,
    default: 10,
  },
});

// https://vitejs.dev/guide/features.html#glob-import
const getAssetSrc = () => {
  const path = `/src/assets/currencies/${props.currency}/${props.currency}_note_${props.amount}_${props.side}.jpg`;
  const modules = import.meta.globEager(`/src/assets/currencies/*/*`);
  if (!modules[path]) {
    return null;
  }
  return modules[path].default;
};
</script>
