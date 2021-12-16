<template>
  <app-pay :id="pid" :key="pid" />
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import appPay from "@/components/Pay.vue";

export default defineComponent({
  components: {
    appPay,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    console.log(route.query);

    const pid = computed(() => {
      if (route.query.id) {
        return `${route.query.id}`;
      }

      return "";
    });

    return { pid };
  },
});
</script>
<style scoped></style>
