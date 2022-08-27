<template>
  <div class="flex justify-center items-center bg-white">
    <app-button-confirm
      class="w-full sm:w-auto"
      :disabled="disabled"
      @click="checkout"
    >
      {{ label }}
    </app-button-confirm>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import useKasseStore from "@/store/kasse";
import useSettingsStore from "@/store/settings";

import appButtonConfirm from "@/components/ui/ButtonConfirm.vue";

import { TillMode } from "@/types";

const router = useRouter();
const kasse = useKasseStore();
const settings = useSettingsStore();

const disabled = computed(() => kasse.items.length === 0);

const label = computed(() => {
  switch (settings.tillMode as TillMode) {
    case TillMode.ORDER_ONLY:
    case TillMode.ORDER_AND_PAY:
      return "Bestellen";
    default:
      return "Bezahlen";
  }
});

const checkout = () => {
  router.push("/checkout");
};
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded-md bg-gray-200 text-4xl border-solid border-8 border-gray-300;
}
</style>
