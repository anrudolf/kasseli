<template>
  <div class="p-4">
    <h1>About</h1>
    <p class="my-2">
      Kasseli is a play pretend super market self-checkout register inspired by
      Migros. Made with ❤ for my godchild Yara.
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
    <p v-if="false">
      Current commit <span class="font-bold">{{ hash.substring(0, 6) }}</span>
    </p>
    <p>Built {{ date }}</p>
  </div>
</template>

<script setup lang="ts">
// replaced dynanmically
const date = "__DATE__";
const hash = "123456789";
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  /*grid-auto-rows: 16rem;*/
}
</style>
