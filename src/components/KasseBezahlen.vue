<template>
  <div class="flex justify-center items-center bg-white">
    <app-button-confirm @click="pay()" class="w-full sm:w-auto"
      >Bezahlen</app-button-confirm
    >
  </div>
</template>

<script>
import appButtonConfirm from "@/components/ButtonConfirm.vue";
export default {
  components: {
    appButtonConfirm,
  },
  methods: {
    pay() {
      this.$router.push("/pay");
    },
  },
};
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded-md bg-gray-200 text-4xl border-solid border-8 border-gray-300;
}
</style>