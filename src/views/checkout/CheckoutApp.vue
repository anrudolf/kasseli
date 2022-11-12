<template>
  <app-button-back class="ml-2">Zurück</app-button-back>

  <div class="mx-4" style="width: 300px">
    <div class="mt-4 flex items-center justify-between">
      <h1 class="text-2xl">Bezahlen</h1>
      <span class="text-2xl text-gray-800"
        >{{ kasse.price.toFixed(2) }} CHF</span
      >
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

<script lang="ts" setup>
import { watch, ref } from "vue";

import qrcodeVue from "qrcode.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import useKasse from "@/store/kasse";
import useAppPayment from "@/hooks/use-app-payment";
import useCheckout from "@/hooks/use-checkout";

const checkout = useCheckout();

const link = ref("");
const code = ref("");

const kasse = useKasse();

const { entity, createPayment, setStatus, listenForChanges } = useAppPayment();

const paymentId = createPayment(kasse.price);
listenForChanges(paymentId);

const proceedToCheckout = (success: boolean) => {
  const paymentMethod = "app";
  if (!success) {
    checkout({
      success,
      paymentMethod,
      price: kasse.price,
      paid: 0,
      change: 0,
    });
    return;
  }

  checkout({
    success,
    paymentMethod,
    price: kasse.price,
    paid: kasse.price,
    change: 0,
  });
};

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
        proceedToCheckout(false);
        break;
      case "pay":
        setStatus(vnew.id, "paid");
        proceedToCheckout(true);
        break;
      default:
        console.log("status:", status);
    }
  }
});

const size = 300;
</script>
<style scoped></style>
