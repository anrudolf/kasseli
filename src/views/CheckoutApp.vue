<template>
  <app-modal v-model="rejectedModal" title="Zahlung abgelehnt" show-confirm>
    <div class="flex justify-center">
      <exclamation-icon class="h-48 w-48 text-red-500"></exclamation-icon>
    </div>
  </app-modal>

  <app-modal
    v-model="successModal"
    title="Zahlung erfolgreich"
    show-confirm
    label-confirm="Beenden"
  >
    <div @click="successModal = false">
      <div class="flex justify-center">
        <check-circle-icon class="w-48 h-48 text-green-500"></check-circle-icon>
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

import { ExclamationIcon, CheckCircleIcon } from "@heroicons/vue/solid";

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
    ExclamationIcon,
    CheckCircleIcon,
  },
  setup() {
    const router = useRouter();
    const link = ref("");
    const rejectedModal = ref(false);
    const successModal = ref(false);

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
            successModal.value = true;
            break;
          default:
            console.error("unknown app payment status:", status);
        }
      }
    });

    const restart = () => {
      kasse.$reset();
      router.push("/");
    };

    watch(successModal, (newVal, oldVal) => {
      if (!newVal) {
        restart();
      }
    });

    return {
      goBack: () => router.push("/checkout"),
      size: 300,
      link,
      entity,
      setStatus,
      rejectedModal,
      successModal,
    };
  },
});
</script>
<style scoped></style>
