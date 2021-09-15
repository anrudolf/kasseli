<template>
  <div class="p-4 max-w-lg">
    <h1 class="my-2">Zahlung #{{ id }}</h1>
    <div v-if="error">Keine Zahlung gefunden.</div>
    <div v-else-if="entity">
      <h2>Bitte bestätigen Sie die Zahlung von</h2>
      <div class="my-4 p-4 text-center text-3xl bg-gray-200 rounded">
        {{ entity.amount.toFixed(2) }} CHF
      </div>
      <button
        class="my-2 w-full btn btn-red text-xl"
        @click="() => setStatus(id, 'rejected')"
      >
        Ablehnen
      </button>
      <button
        class="w-full btn btn-blue text-xl"
        @click="() => setStatus(id, 'paid')"
      >
        Bestätigen
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import useAppPayment from "@/hooks/use-appPayment";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();

    console.log(window.location);

    const { entity, setStatus, error } = useAppPayment(props.id);

    return {
      location: window.location.origin,
      entity,
      setStatus,
      error,
    };
  },
});
</script>
<style scoped>
</style>