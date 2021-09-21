<template>
  <h1>Debug</h1>
  {{ selectedProduct }}
  <button class="btn" @click="setIsOpen(true)">open</button>
  <button class="btn" @click="setIsOpen(false)">close</button>
  <app-modal v-model="isOpen" title="Ding dong" show-confirm>
    <div class="flex justify-center">
      <exclamation-icon class="h-48 w-48 text-red-500"></exclamation-icon>
    </div>
  </app-modal>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { ExclamationIcon } from "@heroicons/vue/solid";

import appModal from "@/components/Modal.vue";

export default defineComponent({
  components: { appModal, ExclamationIcon },
  setup() {
    const isOpen = ref(false);
    const selectedProduct = ref(null);

    return {
      isOpen,
      setIsOpen(value) {
        isOpen.value = value;
      },
      selectedProduct,
    };
  },
});
</script>
