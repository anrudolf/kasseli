<template>
  <app-button-back class="ml-2">Zurück</app-button-back>

  <div class="mx-4" style="width: 300px">
    <div class="mt-4 flex items-center justify-between">
      <h1 class="text-2xl">Bezahlen</h1>
      <span class="text-2xl text-gray-800"
        >{{ kasse.price.toFixed(2) }} CHF</span
      >
    </div>
    <h2 class="text-gray-500">Karte</h2>
    <credit-card-icon class="w-48 h-48 text-blue-500"></credit-card-icon>
  </div>
</template>

<script lang="ts" setup>
import useKasse from "@/store/kasse";
import { CreditCardIcon } from "@heroicons/vue/24/outline";

import appButtonBack from "@/components/ui/ButtonBack.vue";

import useScanner from "../../hooks/use-scanner";
import useCheckout from "@/hooks/use-checkout";

const kasse = useKasse();
const checkout = useCheckout();

useScanner(
  (code) => {
    console.log(`paying with card: ${code}`);
    checkout({
      success: true,
      paymentMethod: "card",
      price: kasse.price,
      paid: kasse.price,
      change: 0,
    });
  },
  [10]
);
</script>
