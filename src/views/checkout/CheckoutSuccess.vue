<template>
  <app-button-back class="ml-2" @click="goBack">Zurück</app-button-back>

  <div class="p-4">
    <h1>Zahlung erfolgreich</h1>
    <h2>Auf Wiedersehen</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appButtonBack from "@/components/ui/ButtonBack.vue";

export default defineComponent({
  components: {
    appButtonBack,
  },
  setup() {
    const router = useRouter();

    return {
      goBack: () => router.push("/"),
    };
  },
});
</script>
<style scoped></style>
