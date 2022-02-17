<template>
  <app-button-back class="ml-2">Zurück</app-button-back>

  <div class="p-4">
    <h1>Bezahlen</h1>
    <h2>Karte</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import appButtonBack from "@/components/ui/ButtonBack.vue";

import useScanner from "../../hooks/use-scanner";

export default defineComponent({
  components: {
    appButtonBack,
  },
  setup() {
    useScanner(
      (code) => {
        console.log(`paid with card ${code}`);
      },
      [10]
    );
  },
});
</script>
<style scoped></style>
