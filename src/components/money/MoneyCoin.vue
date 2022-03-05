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
  const modules = import.meta.globEager(`/src/assets/currencies/*/*`);
  if (!modules[path]) {
    console.log("not found", path);
    return null;
  }
  return modules[path].default;
};
</script>
