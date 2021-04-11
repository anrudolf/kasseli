<template>
  <img :src="getImagePath()" />
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
    getImagePath() {
      const amount = this.amount.toFixed(2);
      return require(`../assets/money/${this.currency}/${this.currency}_coin_${amount}_${this.side}.png`);
    },
  },
};
</script>