<template>
  <app-modal
    v-model="showModal"
    title="Zahlung erfolgreich"
    show-confirm
    label-confirm="Beenden"
  >
    <div class="cursor-pointer" @click="restart">
      <div class="flex justify-center">
        <app-icon icon="check-circle" class="w-48 h-48 text-green-500" />
      </div>
    </div>

    <div class="row bg-gray-300 mt-4">
      <span>Total</span>
      <span>{{ price.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Bezahlt</span>
      <span>{{ paid.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Rückgeld</span>
      <span>{{ change.toFixed(2) }} CHF</span>
    </div>
  </app-modal>

  <div class="flex items-center max-w-lg">
    <app-button-back class="ml-2 mr-auto">Zurück</app-button-back>
    <light-bulb-icon
      v-if="paymentHints.enabled && !cashCalculator.active"
      class="cursor-pointer w-12 h-12"
      :class="paymentHints.active ? 'text-green-500' : 'text-gray-300'"
      @click="toggleHints"
    />
    <calculator-icon
      class="w-12 h-12 cursor-pointer"
      :class="cashCalculator.active ? 'text-green-500' : 'text-gray-300'"
      @click="toggleCalculator"
    ></calculator-icon>
    <x-icon
      class="w-12 h-12 mr-1 text-gray-300 cursor-pointer"
      @click="paid = 0"
    ></x-icon>
  </div>

  <div class="p-2 max-w-lg">
    <div class="row bg-gray-300 mt-4">
      <span>Total</span>
      <span>{{ price.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Bereits bezahlt</span>
      <span>{{ paid.toFixed(2) }} CHF</span>
    </div>

    <div class="row bg-gray-100">
      <span>Restbetrag</span>
      <span>{{ remainder.toFixed(2) }} CHF</span>
    </div>
  </div>

  <div v-if="cashCalculator.active" class="p-2 max-w-lg">
    <app-calculator
      v-model:paid="paid"
      :price="price"
      :remainder="remainder"
    ></app-calculator>
  </div>
  <div v-else class="p-2 max-w-lg">
    <div class="small-coin-grid mt-2">
      <div v-for="element in smallCoins" :key="element.id">
        <app-money-coin
          class="cursor-pointer inline-block min-w-full"
          :class="{ hint: isHint(element.id) }"
          :amount="element.id"
          @click="add(element.id)"
        />
      </div>
    </div>

    <div class="big-coin-grid">
      <div v-for="element in bigCoins" :key="element.id">
        <app-money-coin
          class="cursor-pointer inline-block min-w-full"
          :class="{ hint: isHint(element.id) }"
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
        :class="{ hint: isHint(element.id) }"
        :amount="element.id"
        @click="add(element.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";

import { LightBulbIcon, CalculatorIcon, XIcon } from "@heroicons/vue/outline";

import appMoneyCoin from "@/components/money/MoneyCoin.vue";
import appMoneyNote from "@/components/money/MoneyNote.vue";

import appButtonBack from "@/components/ui/ButtonBack.vue";

import appModal from "@/components/ui/Modal.vue";
import appIcon from "@/components/ui/Icon.vue";
import appCalculator from "@/components/Calculator.vue";

import useKasseStore from "@/store/kasse";
import useSettingsStore from "@/store/settings";

import { createReceipt } from "@/services/receipts";

const router = useRouter();
const kasse = useKasseStore();
const settings = useSettingsStore();
const { paymentHints, cashCalculator } = settings;

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

const price = kasse.price;
const paid = ref(0);

// max to min
const sortedMoney = [...notes, ...coins].sort((a, b) => (a.id > b.id ? -1 : 1));
const leastMoney = computed(() => sortedMoney[sortedMoney.length - 1].id);

const remainder = computed(() => {
  const ret = price - paid.value;
  if (ret < leastMoney.value / 10) {
    return 0;
  }
  return ret;
});

const change = computed(() => {
  const ret = Math.abs(price - paid.value);
  return ret;
});

const showModal = ref(false);

const add = (i: number) => {
  paid.value += i;
};

const restart = () => {
  createReceipt();
  kasse.$reset();
  router.push("/");
};

watch(showModal, (newVal, oldVal) => {
  if (!newVal) {
    restart();
  }
});

watch(
  remainder,
  (newVal, oldVal) => {
    if (newVal === 0) {
      showModal.value = true;
    }
  },
  { immediate: true }
);

const toggleHints = () => {
  paymentHints.active = !paymentHints.active;
};

const toggleCalculator = () => {
  cashCalculator.active = !cashCalculator.active;
};

const hint = computed(() => {
  const min = leastMoney.value;
  const d = min / 10;

  // less or near zero remainder
  if (remainder.value <= 0) {
    return 0;
  } else if (Math.abs(remainder.value) <= d) {
    return 0;
  }

  for (const money of sortedMoney) {
    if (remainder.value - money.id >= 0) {
      return money.id;
    } else if (Math.abs(remainder.value - money.id) <= d) {
      return money.id;
    }
  }

  return min;
});

const isHint = (id: number) =>
  paymentHints.enabled && paymentHints.active && id == hint.value;
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

.hint {
  transform: scale(1);
  animation: hint 1s;
  animation-iteration-count: infinite;
}

@keyframes hint {
  50% {
    transform: scale(1.1);
  }
}
</style>
