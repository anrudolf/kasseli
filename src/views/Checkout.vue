<template>
  <div class="p-4">
    <app-button-back @click="goBack">Zurück</app-button-back>

    <div class="mt-4 flex gap-4 flex-wrap">
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