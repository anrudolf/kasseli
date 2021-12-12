<template>
  <div class="p-4">
    <app-button-back @click="goBack">Zurück</app-button-back>

    <div class="mt-4 flex gap-4 flex-wrap">
      <app-card
        v-if="paymentOptions.card.enabled"
        label="Karte"
        to="/checkout/card"
        image-asset="kreditkarten.jpg"
        contain
      />
      <app-card
        v-if="paymentOptions.cash.enabled"
        label="Bar"
        to="/checkout/cash"
        image-asset="CHF_note_20_front.jpg"
        contain
      />
      <app-card
        v-if="paymentOptions.app.enabled"
        label="App"
        to="/checkout/app"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import appButtonBack from "@/components/ButtonBack.vue";
import appCard from "@/components/Card.vue";

import useUiStore from "@/store/ui";

export default defineComponent({
  components: {
    appButtonBack,
    appCard,
  },
  setup() {
    const router = useRouter();
    const uiStore = useUiStore();

    for (const o of Object.values(uiStore.paymentOptions)) {
      console.log(o);
    }

    console.log(Object.values(uiStore.paymentOptions).every((o) => o.enabled));

    //const noPaymentOptions = computed(() => Object.values())

    return {
      goBack: () => router.push("/"),
      paymentOptions: uiStore.paymentOptions,
    };
  },
});
</script>
<style scoped></style>
