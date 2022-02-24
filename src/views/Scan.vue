<template>
  <div class="w-max-md">
    <div>code: {{ code }}</div>
    <app-quaga-scanner
      :on-detected="onDetected"
      :reader-types="readerTypes"
    ></app-quaga-scanner>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import appQuagaScanner from "@/components/scanner/QuaggaScanner.vue";

const code = ref("");
const readerTypes = ["ean_reader"];

const router = useRouter();

const onDetected = (data: any) => {
  code.value = data.codeResult.code;
  router.push(`/products/new?id=${data.codeResult.code}`);
};
</script>
