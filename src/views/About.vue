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
      Source code is available on
      <a
        class="underline text-indigo-600"
        href="https://github.com/anrudolf/kasseli"
        >Github.</a
      >
    </p>
    <p class="mt-2 text-secondary">
      Built {{ localeDate }} [<a :href="commitHashLink" target="_blank"
        >{{ commitHash.substring(0, 7) }} {{ commitMessage }}</a
      >]
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocaleDateTimeString } from "@/utils/date";

// replaced dynanmically through vite.config.ts
const date = "__DATE__";
const commitHash = "__COMMIT_HASH__";
const commitMessage = "__COMMIT_MESSAGE__";

const commitHashLink = computed(
  () => `https://github.com/anrudolf/kasseli/commit/${commitHash}`
);

const localeDate = computed(() => getLocaleDateTimeString(date));
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  /*grid-auto-rows: 16rem;*/
}
</style>
