<template>
  <app-button-back class="ml-2" @click="goBack">Zurück</app-button-back>

  <div class="p-4">
    <h1>Bezahlen</h1>
    <h2>Karte</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appButtonBack from "@/components/ButtonBack.vue";

import useScanner from "../hooks/use-scanner";

export default defineComponent({
  components: {
    appButtonBack,
  },
  setup() {
    const router = useRouter();

    useScanner(
      (code) => {
        console.log(`paid with card ${code}`);
      },
      [10]
    );

    return {
      goBack: () => router.push("/checkout"),
    };
  },
});
</script>
<style scoped>
</style>