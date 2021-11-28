<template>
  <app-pay :id="pid" />
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import { useRouter } from "vue-router";

import appPay from "@/components/Pay.vue";

export default defineComponent({
  components: {
    appPay,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();

    return { pid: props.id };
  },
});
</script>
<style scoped></style>
