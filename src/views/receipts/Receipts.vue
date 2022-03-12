<template>
  <div class="p-4 max-w-xl">
    <app-modal v-model="showModal" show-confirm>
      <table v-if="receipt" class="w-full">
        <thead>
          <tr>
            <th colspan="3">
              <span>Datum </span> <span>{{ receipt.created }}</span>
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
          <td>{{ r.created }}</td>
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
import { ref, computed } from "vue";

import { EyeIcon } from "@heroicons/vue/solid";

import { Receipt } from "@/types";
import { getReceipts } from "@/services/receipts";

import appModal from "@/components/ui/Modal.vue";

const receipts = ref<Receipt[]>([]);

const grandTotal = computed(() => {
  if (receipts.value.length === 0) {
    //return 0;
  }

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

const fetchData = async (from: string, to: string) => {
  const tmp = await getReceipts({ from, to });
  receipts.value = tmp;
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

fetchData(yesterday.toISOString(), today.toISOString());
</script>

<style scoped>
th,
td {
  @apply p-2;
}
</style>
