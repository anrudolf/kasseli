<template>
  <div class="flex justify-center items-center bg-white">
    <app-button-confirm @click="alert('pay')">Bezahlen</app-button-confirm>
  </div>
</template>

<script>
import appButtonConfirm from "@/components/ButtonConfirm.vue";
export default {
  components: {
    appButtonConfirm,
  },
  methods: {
    alert(v) {
      window.alert(v);
    },
  },
};
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded-md bg-gray-200 text-4xl border-solid border-8 border-gray-300;
}
</style>