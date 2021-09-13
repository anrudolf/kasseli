<template>
  <img :src="getAssetSrc()" />
</template>

<script>
export default {
  props: {
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
  },
  methods: {
    // https://vitejs.dev/guide/features.html#glob-import
    getAssetSrc() {
      const path = `/src/assets/currencies/${this.currency}/${
        this.currency
      }_coin_${this.amount.toFixed(2)}_${this.side}.png`;
      const modules = import.meta.globEager(`/src/assets/currencies/*/*`);
      if (!modules[path]) {
        console.log("not found", path);
        return null;
      }
      return modules[path].default;
    },
  },
};
</script>