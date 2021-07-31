<template>
  <app-button-back class="ml-2" @click="goBack">Zurück</app-button-back>

  <div class="p-4">
    <app-card label="Karte" to="/pay/card" />
    <app-card label="Bar" to="/pay/cash" />
    <app-card label="App" to="/pay/app" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appButtonBack from "@/components/ButtonBack.vue";
import appCard from "@/components/Card.vue";

export default defineComponent({
  components: {
    appButtonBack,
    appCard,
  },
  setup() {
    const router = useRouter();

    return {
      goBack: () => router.push("/"),
    };
  },
});
</script>
<style scoped>
</style>