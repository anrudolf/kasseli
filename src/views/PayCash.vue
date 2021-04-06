<template>
  <app-button-back class="ml-2" @click="$router.push('/')"
    >Zurück</app-button-back
  >

  <draggable
    class="my-4 dragArea flex justify-center items-center relative h-48 w-full border"
    :list="counter"
    group="cash"
    @change="log"
    item-key="name"
  >
    <app-money-note
      v-for="(element, i) in counter"
      :key="`${element.id}-${i}`"
      class="absolute p-3 inline-block m-1 w-20"
      :style="{
        transform: `translate(${i * 5}px, 0px) rotate(${4 * (i - 4)}deg)`,
      }"
      :amount="element.id"
    />
  </draggable>

  <draggable
    class="dragArea flex items-start justify-center"
    :list="wallet"
    :group="{ name: 'cash', pull: 'clone', put: false }"
    @change="log"
    item-key="name"
  >
    <app-money-note
      v-for="element in wallet"
      :key="element.id"
      class="cursor-pointer m-2 inline-block w-24"
      :amount="element.id"
      @click="add(element)"
    />
  </draggable>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

import appMoneyNote from "@/components/MoneyNote.vue";
import appButtonBack from "@/components/ButtonBack.vue";

export default {
  components: {
    draggable: VueDraggableNext,
    appMoneyNote,
    appButtonBack,
  },
  data() {
    return {
      wallet: [
        { name: "10 CHF", id: 10 },
        { name: "20 CHF", id: 20 },
        { name: "50 CHF", id: 50 },
        { name: "100 CHF", id: 100 },
      ],
      counter: [],
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    add(item) {
      this.counter.push({ ...item });
    },
  },
};
</script>
<style scoped></style>