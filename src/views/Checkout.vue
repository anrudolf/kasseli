<template>
  <app-button-back class="ml-2" @click="goBack">Zurück</app-button-back>
  <div class="p-4 flex flex-wrap justify-between">
    <app-card
      label="Karte"
      to="/checkout/card"
      imageAsset="kreditkarten.jpg"
      contain
    />
    <app-card
      label="Bar"
      to="/checkout/cash"
      imageAsset="money/CHF/CHF_note_20_front.jpg"
      contain
    />
    <app-card label="App" to="/checkout/app" />
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