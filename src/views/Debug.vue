<template>
  <h1>Debug</h1>
  {{ selectedProduct }}
  <button class="btn" @click="setIsOpen(true)">open</button>
  <button class="btn" @click="setIsOpen(false)">close</button>
  <app-modal v-model="isOpen" title="Ding dong" unstyled>
    <p>This is what's up</p>
    <app-product-selector @selected="(p) => (selectedProduct = p)" />
  </app-modal>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import appModal from "@/components/Modal2.vue";
import appProductSelector from "../components/ProductSelector.vue";

export default defineComponent({
  components: { appModal, appProductSelector },
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
