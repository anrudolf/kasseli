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
  const modules = import.meta.glob(`/src/assets/currencies/*/*`, {
    eager: true,
  });
  if (!modules[path]) {
    return undefined;
  }
  const mod = modules[path] as { default: string };
  return mod.default;
};
</script>
