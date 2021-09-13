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
      default: 10,
    },
  },
  methods: {
    // https://vitejs.dev/guide/features.html#glob-import
    getAssetSrc() {
      const path = `/src/assets/currencies/${this.currency}/${this.currency}_note_${this.amount}_${this.side}.jpg`;
      const modules = import.meta.globEager(`/src/assets/currencies/*/*`);
      if (!modules[path]) {
        return null;
      }
      return modules[path].default;
    },
  },
};
</script>