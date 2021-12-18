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
        v-if="isOnline && paymentOptions.app.enabled"
        label="App"
        to="/checkout/app"
      >
        <div class="p-5"><device-mobile-icon class="text-green-500" /></div
      ></app-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useOnline } from "@vueuse/core";
import { DeviceMobileIcon } from "@heroicons/vue/outline";

import appButtonBack from "@/components/ButtonBack.vue";
import appCard from "@/components/Card.vue";

import useSettingsStore from "@/store/settings";

export default defineComponent({
  components: {
    appButtonBack,
    appCard,
    DeviceMobileIcon,
  },
  setup() {
    const router = useRouter();
    const settingsStore = useSettingsStore();

    const isOnline = useOnline();

    return {
      goBack: () => router.push("/"),
      paymentOptions: settingsStore.paymentOptions,
      isOnline,
    };
  },
});
</script>
<style scoped></style>
