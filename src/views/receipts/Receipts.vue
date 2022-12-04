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

    <h1>Belege</h1>

    <div class="datepicker">
      <Datepicker
        v-model="range"
        range
        inline
        inline-with-input
        auto-apply
        :preset-ranges="presetRanges"
        input-class-name="dp-custom-input"
        menu-class-name="dp-custom-menu"
        :enable-time-picker="false"
        :format="format"
      />
    </div>

    <div class="mt-4 flex items-center">
      <span class="mr-2">Anzahl</span
      ><app-select v-model.number="pageSize" :items="pageSizeOptions" />
    </div>

    <table class="mt-4 border-collapse border w-full">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left">
            {{ getLocaleDateString(range[0].toISOString()) }} -
            {{ getLocaleDateString(range[1].toISOString()) }}
          </th>
          <th class="text-right font-bold">{{ grandTotal.toFixed(2) }}</th>
          <th class="text-right">
            <button
              class="link flex items-center"
              :disabled="receipts.length === 0"
              @click="startDownload"
            >
              <arrow-down-tray-icon class="w-5 h-5" />
            </button>
          </th>
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
        <tr v-if="receipts.length === 0">
          <td colspan="3" class="text-secondary">
            Keine Quittungen in diesem Zeitraum
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-t bg-gray-100">
          <td class="text-left font-bold">Total</td>
          <td class="text-right font-bold">{{ grandTotal.toFixed(2) }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

import { EyeIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

import { Receipt } from "@/types";
import { getReceipts } from "@/services/receipts";

import appModal from "@/components/ui/Modal.vue";
import appSelect from "@/components/ui/Select.vue";

import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  startOfDay,
  endOfDay,
  startOfYesterday,
  endOfYesterday,
} from "date-fns";

import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

import { getLocaleDateTimeString, getLocaleDateString } from "@/utils/date";
import { download } from "@/services/downloader";

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

const format = (d: Date[]) => {
  const DD0 = `${d[0].getDate()}`.padStart(2, "0");
  const MM0 = `${d[0].getMonth() + 1}`.padStart(2, "0");
  const YYYY0 = d[0].getFullYear();

  const DD1 = `${d[1].getDate()}`.padStart(2, "0");
  const MM1 = `${d[1].getMonth() + 1}`.padStart(2, "0");
  const YYYY1 = d[1].getFullYear();

  return `${YYYY0}-${MM0}-${DD0} - ${YYYY1}-${MM1}-${DD1}`;
};

const now = new Date();
const range = ref<Date[]>([startOfMonth(now), endOfMonth(now)]);
const adjustedRange = computed(() => {
  return [startOfDay(range.value[0]), endOfDay(range.value[1])];
});

const presetRanges = ref([
  { label: "Heute", range: [startOfDay(now), endOfDay(now)] },
  { label: "Gestern", range: [startOfYesterday(), endOfYesterday()] },
  {
    label: "Dieser Monat",
    range: [startOfMonth(now), endOfMonth(now)],
  },
  {
    label: "Letzter Monat",
    range: [startOfMonth(subMonths(now, 1)), endOfMonth(subMonths(now, 1))],
  },
  {
    label: "Dieses Jahr",
    range: [startOfYear(now), endOfYear(now)],
  },
]);

const receipts = ref<Receipt[]>([]);

const grandTotal = computed(() => {
  return receipts.value.reduce((prev, cur) => prev + cur.price, 0);
});

const showModal = ref(false);
const receipt = ref<Receipt | null>(null);

const select = (r: Receipt) => {
  receipt.value = r;
  showModal.value = true;
};

const fetchData = async () => {
  const from = adjustedRange.value[0].toISOString();
  const to = adjustedRange.value[1].toISOString();
  const max = pageSize.value;
  const tmp = await getReceipts({ from, to, max });
  receipts.value = tmp;
};

const startDownload = () => {
  const data: (string | number)[][] = [];
  const header = ["date", "rid", "pid", "label", "qty", "price"];

  data.push(header);
  receipts.value.forEach((r) => {
    r.content.forEach((c) => {
      const row = [
        getLocaleDateTimeString(r.created),
        r.id,
        c.product.id,
        c.product.label.de,
        c.quantity,
        c.price * c.quantity,
      ];
      data.push(row);
    });
  });

  let csvContent = "";
  data.forEach((row) => {
    csvContent += row.join(";") + "\n";
  });

  download(csvContent, "receipts.csv", "text/csv;encoding:utf-8");
};

watch(pageSize, (newVal, oldVal) => {
  fetchData();
});

watch(range, (newVal, oldVal) => {
  fetchData();
});

fetchData();
</script>

<style scoped>
th,
td {
  @apply p-2;
}
</style>

<style>
.dp-custom-input {
  /*width: 32rem;*/
  font-size: 80%;
}

.dp-custom-menu {
  margin-top: 0.75rem;
}
</style>
