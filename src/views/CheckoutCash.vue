<template>
  <app-button-back class="ml-2" @click="$router.push('/checkout')"
    >Zurück</app-button-back
  >

  <div class="p-2 max-w-md">
    <h1>Bezahlen</h1>
    <h2>Bar</h2>

    <div
      class="
        h-20
        border
        p-2
        mt-2
        bg-blue-400
        rounded
        text-white text-2xl
        flex
        justify-between
        items-center
      "
    >
      <span>Betrag</span>
      <span>{{ remainder.toFixed(2) }} CHF</span>
    </div>

    <div class="small-coin-grid mt-2">
      <div v-for="element in smallCoins" :key="element.id">
        <app-money-coin
          class="cursor-pointer inline-block min-w-full"
          :amount="element.id"
          @click="add(element.id)"
        />
      </div>
    </div>

    <div class="big-coin-grid">
      <div v-for="element in bigCoins" :key="element.id">
        <app-money-coin
          class="cursor-pointer inline-block min-w-full"
          :amount="element.id"
          @click="add(element.id)"
        />
      </div>
    </div>

    <div class="mt-2">
      <app-money-note
        v-for="element in notes"
        :key="element.id"
        class="cursor-pointer m-2 inline-block w-16"
        :amount="element.id"
        @click="add(element.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import appMoneyNote from "@/components/MoneyNote.vue";
import appMoneyCoin from "@/components/MoneyCoin.vue";

import appButtonBack from "@/components/ButtonBack.vue";

import useKasseStore from "@/store/kasse";

export default defineComponent({
  components: {
    appMoneyNote,
    appMoneyCoin,
    appButtonBack,
  },
  setup() {
    const kasse = useKasseStore();

    const notes = [
      { type: "note", name: "10 CHF", id: 10 },
      { type: "note", name: "20 CHF", id: 20 },
      { type: "note", name: "50 CHF", id: 50 },
      { type: "note", name: "100 CHF", id: 100 },
    ];

    const coins = [
      { type: "coin", name: "0.05 CHF", id: 0.05 },
      { type: "coin", name: "0.10 CHF", id: 0.1 },
      { type: "coin", name: "0.20 CHF", id: 0.2 },
      { type: "coin", name: "0.50 CHF", id: 0.5 },
      { type: "coin", name: "1.00 CHF", id: 1.0 },
      { type: "coin", name: "2.00 CHF", id: 2.0 },
      { type: "coin", name: "5.00 CHF", id: 5.0 },
    ];

    const smallCoins = [
      { type: "coin", name: "0.05 CHF", id: 0.05 },
      { type: "coin", name: "0.10 CHF", id: 0.1 },
      { type: "coin", name: "0.20 CHF", id: 0.2 },
      { type: "coin", name: "0.50 CHF", id: 0.5 },
    ];

    const bigCoins = [
      { type: "coin", name: "1.00 CHF", id: 1.0 },
      { type: "coin", name: "2.00 CHF", id: 2.0 },
      { type: "coin", name: "5.00 CHF", id: 5.0 },
    ];

    const total = kasse.price;
    const paid = ref(0);
    const remainder = computed(() => {
      return total - paid.value;
    });

    const add = (i: number) => {
      paid.value += i;
    };

    return { notes, coins, smallCoins, bigCoins, total, paid, add, remainder };
  },
});
</script>
<style scoped>
.small-coin-grid {
  display: grid;
  grid-template-columns: 0.5fr 0.7fr 0.8fr 0.6fr;
  align-items: center;
  gap: 25px;
}

.big-coin-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.5fr;
  align-items: center;
  gap: 20px;
}
</style>