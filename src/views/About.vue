<template>
  <div class="p-4">
    <h1>About</h1>
    <p class="my-2">
      Kasseli is a play pretend super market self checkout register inspired by
      Migros. You can use a barcode reader to scan products to buy, as well as
      register new products in inventory mode. It is web based and runs in any
      browser, such as on a tablet or on a Raspberry Pi with Touch screen.
    </p>
    <h2 class="my-2">Code</h2>
    <p>
      This project is open source. It consists of a Vuejs front-end and a
      firestore backend.
    </p>
    <p>
      Source code available on
      <a
        class="underline text-indigo-600"
        href="https://github.com/anrudolf/kasseli"
        >Github.</a
      >
    </p>
    <p>
      Current commit <span class="font-bold">{{ hash.substring(0, 6) }}</span>
    </p>
    <p>Built {{ date }}</p>
  </div>
  <div v-show="false">
    <button @click="getProduct">LOG</button>
    {{ products }}
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // replaced dyanmically
    const date = "__DATE__";
    const hash = "123456789";
    return { date, hash };
  },
});
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  /*grid-auto-rows: 16rem;*/
}
</style>
