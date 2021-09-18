<template>
  <h1>Debug</h1>
  <button class="btn" @click="setIsOpen(true)">open</button>
  <button class="btn" @click="setIsOpen(false)">close</button>
  <app-modal v-model="isOpen" title="Ding dong" />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import appModal from "@/components/Modal2.vue";

export default defineComponent({
  components: { appModal },
  setup() {
    const isOpen = ref(true);

    return {
      isOpen,
      setIsOpen(value) {
        isOpen.value = value;
      },
    };
  },
});
</script>
