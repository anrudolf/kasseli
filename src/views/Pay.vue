<template>
  <div class="p-4 max-w-lg">
    <app-modal v-if="entity" v-model="closedModal" :title="closedModalTitle">
      <div v-if="entity.status == 'paid'">:)</div>
      <div v-else>:(</div>
    </app-modal>
    <h1 class="my-2">Zahlung #{{ id }}</h1>
    <div v-if="error">Keine Zahlung gefunden.</div>
    <div v-else-if="entity">
      <h2>Bitte bestätigen Sie die Zahlung von</h2>
      <div class="my-4 p-4 text-center text-3xl bg-gray-200 rounded">
        {{ entity.amount.toFixed(2) }} CHF
      </div>
      <button
        class="my-2 w-full btn btn-red text-xl"
        @click="() => setStatus(id, 'reject')"
      >
        Ablehnen
      </button>
      <button
        class="w-full btn btn-blue text-xl"
        @click="() => setStatus(id, 'pay')"
      >
        Bestätigen
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import { useRouter } from "vue-router";

import appModal from "@/components/Modal.vue";

import useAppPayment from "@/hooks/use-appPayment";

export default defineComponent({
  components: {
    appModal,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const closedModal = ref(false);

    console.log(window.location);

    const { entity, setStatus, error, listenForChanges } = useAppPayment(
      props.id
    );

    if (props.id) {
      listenForChanges(props.id);
    }

    watch(entity, (vnew) => {
      if (vnew) {
        const { status } = vnew;

        if (status === "paid" || status === "rejected") {
          closedModal.value = true;
        }
      }
    });

    const closedModalTitle = computed(() => {
      if (entity.value?.status === "paid") {
        return "Zahlung erhalten";
      }

      if (entity.value?.status == "rejected") {
        return "Zahlung abgelehnt";
      }

      return "???";
    });

    return {
      location: window.location.origin,
      entity,
      setStatus,
      error,
      closedModal,
      closedModalTitle,
    };
  },
});
</script>
<style scoped></style>
