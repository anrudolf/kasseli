<template>
  <app-pay :id="pid" :key="pid" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import appPay from "@/components/Pay.vue";

const route = useRoute();
console.log(route.query);

const pid = computed(() => {
  if (route.query.id) {
    return `${route.query.id}`;
  }

  return "";
});
</script>
<style scoped></style>
