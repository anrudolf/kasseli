<template>
  <div class="w-max-md p-1">
    <app-quaga-scanner
      :on-detected="onDetected"
      :reader-types="readerTypes"
      @cancel="router.go(-1)"
    ></app-quaga-scanner>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import appQuagaScanner from "@/components/scanner/QuaggaScanner.vue";

import { readerTypes } from "@/utils/camerascanner";

const code = ref("");

const router = useRouter();

const onDetected = (data: any) => {
  code.value = data.codeResult.code;
  router.push(`/products/new?id=${data.codeResult.code}`);
};
</script>
