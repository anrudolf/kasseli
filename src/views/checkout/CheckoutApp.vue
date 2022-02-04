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

  <div class="mx-4" style="width: 300px">
    <div class="mt-4 flex items-center justify-between">
      <h1 class="text-2xl">Bezahlen</h1>
      <span class="text-2xl text-gray-800">{{ price.toFixed(2) }} CHF</span>
    </div>
    <div v-if="code" class="mt-2 flex flex-col">
      <span class="text-gray-500">Code</span>
      <span
        class="font-bold text-4xl text-gray-800"
        style="letter-spacing: 0.2em"
        >{{ code }}</span
      >
    </div>
    <div v-if="link" class="mt-2">
      <qrcode-vue :value="link" :size="size" level="H" />
      <span v-if="false">{{ link }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";

import { ExclamationIcon, CheckCircleIcon } from "@heroicons/vue/solid";

import qrcodeVue from "qrcode.vue";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appModal from "@/components/ui/Modal.vue";

import useAppPayment from "@/hooks/use-app-payment";

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
    const code = ref("");

    const kasse = useKasse();

    const { entity, createPayment, setStatus, listenForChanges } =
      useAppPayment();

    const paymentId = createPayment(kasse.price);
    listenForChanges(paymentId);

    watch(entity, (vnew) => {
      if (vnew) {
        const { id, status } = vnew;

        link.value = `${window.location.origin}/pay?id=${id}`;
        code.value = id;

        switch (status) {
          case "open":
            break;
          case "reject":
            setStatus(vnew.id, "rejected");
            rejectedModal.value = true;
            break;
          case "pay":
            setStatus(vnew.id, "paid");
            successModal.value = true;
            break;
          default:
            console.log("status:", status);
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
      code,
      entity,
      rejectedModal,
      successModal,
      price: kasse.price,
    };
  },
});
</script>
<style scoped></style>
