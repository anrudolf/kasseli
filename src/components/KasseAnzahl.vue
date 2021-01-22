<template>
  <div class="bg-gray-300 p-2 flex flex-col text-center">
    <div class="label">Anzahl</div>
    <div class="flex-1 px-2 bg-white flex justify-between items-center">
      <button class="btn text-red-600" @click="remove">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <span class="text-6xl">{{ quantity }}</span>
      <button class="btn text-green-900" @click="add">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selected() {
      return this.$store.getters["kasse/selected"];
    },
    quantity() {
      if (!this.selected) {
        return "";
      }
      return this.$store.getters["kasse/selected"].quantity;
    },
  },
  methods: {
    add() {
      this.selected && this.$store.dispatch("kasse/add", this.selected.code);
    },
    remove() {
      this.selected && this.$store.dispatch("kasse/remove", this.selected.code);
    },
  },
};
</script>

<style scoped>
.btn {
  @apply w-16 p-2 rounded-md bg-gray-200 text-4xl;
}

.label {
  @apply h-8 text-xl font-medium;
}
</style>

