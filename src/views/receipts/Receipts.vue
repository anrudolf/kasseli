<template>
  <div class="p-4 max-w-xl">
    <app-modal v-model="showModal" show-confirm>
      <table v-if="receipt" class="w-full">
        <thead>
          <tr>
            <th colspan="3">
              <span>Datum </span>
              <span>{{ getLocaleDateTimeString(receipt.created) }}</span>
            </th>
          </tr>
          <tr class="border-b border-black">
            <th class="w-8 text-right">#</th>
            <th>Produkt</th>
            <th class="text-right">Preis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in receipt.content" :key="item.code">
            <td class="text-right">{{ item.quantity }}</td>
            <td>{{ item.product.label.de }}</td>
            <td class="text-right">{{ item.price.toFixed(2) }}</td>
          </tr>
          <tr class="border-t border-black">
            <td></td>
            <td class="text-right">Total</td>
            <td class="text-right">
              <span>{{ receipt.price.toFixed(2) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </app-modal>

    <h1>Quittungen</h1>

    <div class="flex space-x-2">
      <label>
        von
        <input v-model="from" class="input" />
      </label>

      <label>
        bis
        <input v-model="to" class="input" />
      </label>
    </div>

    <app-select v-model.number="pageSize" :items="pageSizeOptions" />

    <table class="mt-4 border-collapse border w-full">
      <thead>
        <tr>
          <td class="text-right font-bold">Total</td>
          <td class="text-right font-bold">{{ grandTotal.toFixed(2) }}</td>
          <td></td>
        </tr>
        <tr class="border text-left">
          <th>Datum</th>
          <th class="text-right">Preis</th>
          <th class="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="r in receipts"
          :key="r.id"
          class="cursor-pointer"
          @click="select(r)"
        >
          <td>{{ getLocaleDateTimeString(r.created) }}</td>
          <td class="text-right">{{ r.price.toFixed(2) }}</td>
          <td>
            <button class="link flex items-center">
              <eye-icon class="w-5 h-5"></eye-icon>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-t">
          <td class="text-right font-bold">Total</td>
          <td class="text-right font-bold">{{ grandTotal.toFixed(2) }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

import { EyeIcon } from "@heroicons/vue/solid";

import { Receipt } from "@/types";
import { getReceipts } from "@/services/receipts";

import appModal from "@/components/ui/Modal.vue";
import appSelect from "@/components/ui/Select.vue";

import { getLocaleDateTimeString } from "@/utils/date";

const pageSizeOptions = [
  { text: "5", value: 5 },
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "50", value: 50 },
  { text: "100", value: 100 },
  { text: "200", value: 200 },
  { text: "500", value: 500 },
  { text: "1000", value: 1000 },
  { text: "2000", value: 2000 },
  { text: "5000", value: 5000 },
];

const pageSize = ref(pageSizeOptions[0].value);

const receipts = ref<Receipt[]>([]);

const grandTotal = computed(() => {
  return receipts.value.reduce((prev, cur) => prev + cur.price, 0);
});

const from = ref("");
const to = ref("");

const showModal = ref(false);
const receipt = ref<Receipt | null>(null);

const select = (r: Receipt) => {
  receipt.value = r;
  showModal.value = true;
};

const fetchData = async ({
  from,
  to,
  max,
}: {
  from: string;
  to: string;
  max: number;
}) => {
  const tmp = await getReceipts({ from, to, max });
  receipts.value = tmp;
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

fetchData({
  from: yesterday.toISOString(),
  to: today.toISOString(),
  max: pageSize.value,
});

watch(pageSize, (newVal, oldVal) => {
  fetchData({
    from: yesterday.toISOString(),
    to: today.toISOString(),
    max: pageSize.value,
  });
});
</script>

<style scoped>
th,
td {
  @apply p-2;
}
</style>
