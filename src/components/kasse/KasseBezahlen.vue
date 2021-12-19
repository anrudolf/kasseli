<template>
  <div class="flex justify-center items-center bg-white">
    <app-button-confirm
      @click="checkout()"
      class="w-full sm:w-auto"
      :disabled="disabled"
      >Bezahlen</app-button-confirm
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

import useKasseStore from "@/store/kasse";

import appButtonConfirm from "@/components/ButtonConfirm.vue";

export default defineComponent({
  components: {
    appButtonConfirm,
  },
  setup() {
    const router = useRouter();
    const kasse = useKasseStore();

    const disabled = computed(() => kasse.price == 0);

    const checkout = () => {
      router.push("/checkout");
    };

    return { checkout, disabled };
  },
});
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded-md bg-gray-200 text-4xl border-solid border-8 border-gray-300;
}
</style>