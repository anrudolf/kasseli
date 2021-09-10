<template>
  <app-modal :visible="showModal" @close="restart" title="Zahlung erfolgreich">
    <div @click="restart">
      <div class="flex justify-center">
        <app-icon icon="check-circle" class="w-48 h-48 text-green-500" />
      </div>
      <div class="mt-3 flex justify-end">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          @click="restart"
        >
          Beenden
        </button>
      </div>
    </div>
  </app-modal>

  <app-button-back class="ml-2" @click="$router.push('/checkout')"
    >Zurück</app-button-back
  >

  <div class="p-2 max-w-md">
    <div class="row bg-gray-300 mt-4">
      <span>Total</span>
      <span>{{ total.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Bereits bezahlt</span>
      <span>{{ paid.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Restbetrag</span>
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
import { defineComponent, ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";

import appMoneyNote from "@/components/MoneyNote.vue";
import appMoneyCoin from "@/components/MoneyCoin.vue";

import appButtonBack from "@/components/ButtonBack.vue";

import appModal from "@/components/Modal.vue";
import appIcon from "@/components/Icon.vue";

import useKasseStore from "@/store/kasse";

export default defineComponent({
  components: {
    appMoneyNote,
    appMoneyCoin,
    appButtonBack,
    appModal,
    appIcon,
  },
  setup() {
    const router = useRouter();
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
      const ret = total - paid.value;
      if (ret < 0.001) {
        return 0;
      }
      return ret;
    });

    const showModal = ref(false);

    const add = (i: number) => {
      paid.value += i;
      if (remainder.value == 0) {
        showModal.value = true;
      }
    };

    const restart = () => {
      kasse.$reset();
      router.push("/");
    };

    return {
      notes,
      coins,
      smallCoins,
      bigCoins,
      total,
      paid,
      add,
      remainder,
      showModal,
      restart,
    };
  },
});
</script>
<style scoped>
.small-coin-grid {
  display: grid;
  grid-template-columns: 0.5fr 0.7fr 0.8fr 0.6fr;
  align-items: center;
  gap: 30px;
}

.big-coin-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.5fr;
  align-items: center;
  gap: 25px;
}

.row {
  @apply flex justify-between text-xl p-1 px-2;
}
</style>