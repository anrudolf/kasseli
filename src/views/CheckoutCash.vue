<template>
  <app-button-back class="ml-2" @click="$router.push('/checkout')"
    >Zurück</app-button-back
  >

  <div class="p-4">
    <draggable
      class="my-4 dragArea flex justify-center items-center relative h-36 w-full border-4 border-dashed"
      :list="counter"
      :group="{ name: 'cash' }"
      :sort="false"
      item-key="name"
      @click="pop"
    >
      <div
        class="absolute p-3 inline-block m-1 w-24"
        v-for="(element, i) in counter.filter((e) => e.type === 'note')"
        :key="`${element.id}-${i}`"
      >
        <app-money-note
          :style="{
            transform: `translate(${
              20 * Math.sin((i / 20.0) * 2 * Math.PI - Math.PI / 2)
            }px, 0px) rotate(${
              20 * Math.sin((i / 20.0) * 2 * Math.PI - Math.PI / 2)
            }deg)`,
          }"
          :amount="element.id"
        />
      </div>
      <div
        class="absolute p-3 inline-block m-1 w-20"
        v-for="(element, i) in counter.filter((e) => e.type === 'coin')"
        :key="`${element.id}-${i}`"
      >
        <app-money-coin
          :style="{
            transform: `translate(${Math.random() * 20 - 10}px, ${
              Math.random() * 20 - 10
            }px) rotate(${Math.random() * 40 - 20}deg)`,
          }"
          :amount="element.id"
        />
      </div>
    </draggable>
  </div>

  <div v-if="!isCashReady" class="flex justify-center">
    <app-wallet @click="handleWallet" :isClosed="isWalletClosed" />
  </div>
  <div v-else>
    <draggable
      class="dragArea flex items-start justify-center"
      :list="notes"
      :group="{ name: 'cash', pull: 'clone', put: false }"
      @change="log"
      item-key="name"
    >
      <app-money-note
        v-for="element in notes"
        :key="element.id"
        class="cursor-pointer m-2 inline-block w-16"
        :amount="element.id"
        @click="add(element)"
      />
    </draggable>

    <draggable
      class="dragArea flex flex-wrap items-start justify-center"
      :list="coins"
      :group="{ name: 'cash', pull: 'clone', put: false }"
      @change="log"
      item-key="name"
    >
      <app-money-coin
        v-for="element in coins"
        :key="element.id"
        class="cursor-pointer m-2 inline-block w-16"
        :amount="element.id"
        @click="add(element)"
      />
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

import appMoneyNote from "@/components/MoneyNote.vue";
import appMoneyCoin from "@/components/MoneyCoin.vue";

import appButtonBack from "@/components/ButtonBack.vue";

import appWallet from "@/components/Wallet.vue";

export default {
  components: {
    draggable: VueDraggableNext,
    appMoneyNote,
    appMoneyCoin,
    appButtonBack,
    appWallet,
  },
  data() {
    return {
      notes: [
        { type: "note", name: "10 CHF", id: 10 },
        { type: "note", name: "20 CHF", id: 20 },
        { type: "note", name: "50 CHF", id: 50 },
        { type: "note", name: "100 CHF", id: 100 },
      ],
      coins: [
        { type: "coin", name: "0.05 CHF", id: 0.05 },
        { type: "coin", name: "0.10 CHF", id: 0.1 },
        { type: "coin", name: "0.20 CHF", id: 0.2 },
        { type: "coin", name: "0.50 CHF", id: 0.5 },
        { type: "coin", name: "1.00 CHF", id: 1.0 },
        { type: "coin", name: "2.00 CHF", id: 2.0 },
        { type: "coin", name: "5.00 CHF", id: 5.0 },
      ],
      counter: [],
      isWalletClosed: true,
      isCashReady: false,
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    add(item) {
      this.counter.push({ ...item });
    },
    pop() {
      this.counter.pop();
    },
    handleWallet() {
      if (this.isWalletClosed) {
        this.isWalletClosed = false;
        return;
      }

      this.isCashReady = true;
    },
  },
};
</script>
<style scoped>
</style>