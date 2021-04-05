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
      default: 10,
    },
  },
  methods: {
    getImagePath() {
      return require(`../assets/money/${this.currency}/${this.currency}_${this.amount}_${this.side}.jpg`);
    },
  },
};
</script>