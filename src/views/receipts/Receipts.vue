<template>
  <div class="p-4">
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

    <table class="border-collapse border table-auto w-full">
      <thead>
        <tr class="text-left">
          <th class="border">Datum</th>
          <th class="border">ID</th>
          <th class="border">Preis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="receipt in receipts" :key="receipt.id">
          <td class="border">{{ receipt.created }}</td>
          <td class="border">{{ receipt.id }}</td>
          <td class="border">{{ receipt.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { Receipt } from "@/types";
import { getReceipts } from "@/services/receipts";

const receipts = ref<Receipt[]>([]);

const from = ref("");
const to = ref("");

const fetchData = async (from: string, to: string) => {
  const tmp = await getReceipts({ from, to });
  receipts.value = tmp;
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

fetchData(yesterday.toISOString(), today.toISOString());
</script>
