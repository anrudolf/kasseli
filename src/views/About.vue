<template>
  <div>
    <h1>This is an about page</h1>
    <div class="wrapper" style="height: 1000px">
      <div>Hello</div>
      <app-barcode-stream-reader @decode="onDecode" @loaded="onLoaded" />
    </div>
  </div>
</template>

<script>
import appBarcodeStreamReader from "@/components/BarcodeStreamReader.vue";

export default {
  components: {
    appBarcodeStreamReader,
  },
  methods: {
    onDecode(val) {
      console.log(val);
    },
    onLoaded() {
      console.log("loaded");
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  /*grid-auto-rows: 16rem;*/
}
</style>
