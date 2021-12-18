<template>
  <table
    class="my-3 min-w-full table-auto shadow-lg bg-white"
    @keyup.page-up="prev"
    @keyup.page-down="next"
  >
    <thead class="bg-gray-100">
      <tr>
        <th class="text-left">Product</th>
        <th class="text-right">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in result"
        :key="product.id"
        class="cursor-pointer hover:bg-blue-100 border-b"
        tabindex="0"
        @click="() => selected(product.id)"
        @keyup.enter="() => selected(product.id)"
      >
        <td class="text-left">{{ product.label.de || product.id }}</td>
        <td class="text-right">
          {{ product.price ? product.price.toFixed(2) : "---" }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-between items-center">
    <div>
      <app-select v-model.number="pageSize" :items="pageSizeOptions" />
    </div>

    <div class="flex items-center space-x-2">
      <button class="border p-2 flex" @click="prev">
        <chevron-left-icon class="w-6 h-6" />
        <span class="mx-2 hidden sm:inline">PREV</span>
      </button>
      <button class="border p-2 flex" @click="next">
        <span class="mx-2 hidden sm:inline">NEXT</span>
        <chevron-right-icon class="w-6 h-6" />
      </button>
    </div>

    <div>{{ currentPage }} / {{ lastPage }}</div>
  </div>
</template>

<script lang="ts">
import {
  toRef,
  watch,
  defineComponent,
  PropType,
  onMounted,
  onBeforeUnmount,
} from "vue";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/solid";

import { useRouter } from "vue-router";
import { useArrayPagination } from "../hooks/use-arraypagination";

import appSelect from "../components/Select.vue";

import { Product } from "@/types";

export default defineComponent({
  components: {
    appSelect,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    products: {
      type: Object as PropType<Array<Product>>,
      required: true,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const router = useRouter();
    const products = toRef(props, "products");

    const pageSizeOptions = [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "20", value: 20 },
      { text: "50", value: 50 },
      { text: "100", value: 100 },
    ];

    const { next, prev, currentPage, lastPage, result, pageSize, offset } =
      useArrayPagination(products, {
        pageSize: pageSizeOptions[0].value,
        currentPage: 1,
      });

    watch(products, () => {
      currentPage.value = 1;
    });

    const selected = (id) => {
      currentPage.value = 1;
      pageSize.value = pageSizeOptions[0].value;
      emit("selected", id);
    };

    const arrowLeftRightListener = (e) => {
      switch (e.code) {
        case "PageUp":
          prev();
          break;
        case "PageDown":
          next();
          break;
        default:
          break;
      }
    };

    onMounted(() => {
      document.addEventListener("keyup", arrowLeftRightListener);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keyup", arrowLeftRightListener);
    });

    return {
      // product selector
      selected,
      // pagination
      next,
      prev,
      currentPage,
      lastPage,
      pageSize,
      result,
      offset,
      // page size selector
      pageSizeOptions,
      // router
      router,
    };
  },
});
</script>

<style scoped>
td,
th {
  padding: 12px;
}
</style>
