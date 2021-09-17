<template>
  <app-modal :visible="rejectedModal" @close="rejectedModal = false">
    <template #title>Zahlung abgelehnt</template>
    <div>
      <div class="mt-3 flex justify-between">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          @click="rejectedModal = false"
        >
          OK
        </button>
      </div>
    </div>
  </app-modal>

  <app-button-back class="ml-2" @click="goBack">Zurück</app-button-back>

  <div class="p-4">
    <h1>Bezahlen</h1>
    <h2>App</h2>
    <div v-if="link">
      <qrcode-vue :value="link" :size="size" level="H" />
      {{ link }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";

import qrcodeVue from "qrcode.vue";

import appButtonBack from "@/components/ButtonBack.vue";
import appModal from "@/components/Modal.vue";

import useAppPayment from "@/hooks/use-appPayment";

import useKasse from "@/store/kasse";

export default defineComponent({
  components: {
    appButtonBack,
    appModal,
    qrcodeVue,
  },
  setup() {
    const router = useRouter();
    const link = ref("");
    const rejectedModal = ref(false);
    const kasse = useKasse();

    const { entity, create, setStatus } = useAppPayment();

    create(kasse.price);

    watch(entity, (vnew) => {
      if (vnew) {
        const { id, status } = vnew;

        link.value = `${window.location.origin}/pay?id=${id}`;

        switch (status) {
          case "open":
            break;
          case "rejected":
            rejectedModal.value = true;
            break;
          case "paid":
            console.log("paid!");
            router.push("/checkout/success");
            break;
          default:
            console.error("unknown app payment status:", status);
        }
      }
    });

    return {
      goBack: () => router.push("/checkout"),
      size: 300,
      link,
      entity,
      setStatus,
      rejectedModal,
    };
  },
});
</script>
<style scoped></style>
