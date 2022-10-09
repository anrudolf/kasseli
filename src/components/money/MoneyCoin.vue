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
    default: 1,
  },
});

// https://vitejs.dev/guide/features.html#glob-import
const getAssetSrc = () => {
  const path = `/src/assets/currencies/${props.currency}/${
    props.currency
  }_coin_${props.amount.toFixed(2)}_${props.side}.png`;
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
