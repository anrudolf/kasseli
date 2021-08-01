<template>
  <app-button-back class="ml-2" @click="goBack">Zurück</app-button-back>

  <div class="p-4">
    <h1>Bezahlen</h1>
    <h2>App</h2>
    <qrcode-vue :value="code" :size="size" level="H" />
    <div v-if="entity">
      {{ entity }}
      <button class="btn btn-blue" @click="() => setStatus(entity.id, 'paid')">
        PAID
      </button>
      <button
        class="btn btn-blue"
        @click="() => setStatus(entity.id, 'rejected')"
      >
        REJECTED
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import qrcodeVue from "qrcode.vue";

import appButtonBack from "@/components/ButtonBack.vue";

import db from "@/utils/db";

import useAppPayments from "@/hooks/use-appPayments";

export default defineComponent({
  components: {
    appButtonBack,
    qrcodeVue,
  },
  setup() {
    const router = useRouter();

    const createCode = () => {
      // 1. clear all codes older than 5 minutes
      // 2. create code
      // 3. make sure code does exist yet (otherwise go back to step 2)
    };

    const { entity, create, setStatus } = useAppPayments();

    create();

    return {
      goBack: () => router.push("/checkout"),
      size: 300,
      code: "https://example.com",
      entity,
      setStatus,
    };
  },
});
</script>
<style scoped>
</style>