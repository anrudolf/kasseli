<template>
  <div class="bg-gray-300 kasse-liste-wrapper">
    <div class="p-2 flex justify-center items-center" style="grid-area: header">
      <h1 class="md:text-4xl">Ihr Einkauf</h1>
    </div>
    <ul
      style="grid-area: list"
      class="kasse-liste-list-wrapper ml-2 bg-white"
      :style="`grid-template-rows: repeat(${pageSize}, 1fr)`"
    >
      <li
        v-for="(n, i) in pageSize"
        :key="i"
        @click="selectFromPage(i)"
        class="cursor-pointer"
        :class="{ odd: offset % 2 }"
      >
        <app-kasse-liste-item
          v-if="getItem(i)"
          :quantity="getItem(i).quantity"
          :label="getItem(i).product.label.de"
          :price="getItem(i).price"
          :selected="i === selectedIndexInPage"
        />
        <span v-else></span>
      </li>
    </ul>
    <div
      style="grid-area: sidebar"
      class="flex flex-col items-center mr-2 bg-white"
    >
      <button
        class="my-1 rounded border-2 w-12 h-12 flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200"
        @click="prev"
        :disabled="!hasPrev"
        :class="{ disabled: !hasPrev }"
      >
        <app-icon icon="arrow-page-up" color="gray" />
      </button>
      <button
        class="mt-6 rounded border-2 w-12 h-12 flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200"
        @click="next"
        :disabled="!hasNext"
        :class="{ disabled: !hasNext }"
      >
        <app-icon icon="arrow-page-down" color="gray" />
      </button>
    </div>
    <div style="grid-area: footer" />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import appKasseListeItem from "@/components/KasseListeItem.vue";
import appIcon from "@/components/Icon.vue";

import useKasseStore from "@/store/kasse";

export default defineComponent({
  name: "KasseListe",
  components: {
    appKasseListeItem,
    appIcon,
  },
  setup() {
    const store = useKasseStore();

    const offset = computed(() => store.offset);
    const page = computed(() => store.page);
    const pageSize = computed(() => store.pageSize);
    const hasPrev = computed(() => store.hasPrev);
    const hasNext = computed(() => store.hasNext);
    const selectedIndexInPage = computed(() => store.selectedIndexInPage);

    const selectFromPage = (i) => {
      store.selectFromPage(i);
    };

    const getItem = (i) => {
      return page.value[i];
    };

    return {
      offset,
      page,
      pageSize,
      hasPrev,
      hasNext,
      selectedIndexInPage,
      // functions
      selectFromPage,
      getItem,
      next: store.next,
      prev: store.prev,
    };
  },
});
</script>

<style scoped>
li {
  /*
  display: flex;
  align-items: center;
  */
}

li:nth-child(odd) {
  color: #777;
  background: #eee;
}
li:nth-child(even) {
  color: #777;
  background: #fff;
}

li.odd:nth-child(odd) {
  color: #777;
  background: #fff;
}
li.odd:nth-child(even) {
  color: #777;
  background: #eee;
}

.kasse-liste-wrapper {
  display: grid;
  grid-template-rows: 2.5rem 1fr 1rem;
  grid-template-columns: 1fr 3rem;
  grid-gap: 0rem;
  grid-template-areas:
    "header header"
    "list sidebar"
    "footer footer";
}

/* TODO: dynamic on pageSize */
.kasse-liste-list-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  /*grid-template-rows: repeat(3, 1fr);*/
}

@media (min-width: 640px) {
  .kasse-liste-wrapper {
    display: grid;
    grid-template-rows: 3.5rem 1fr 1rem;
    grid-template-columns: 1fr 5rem;
    grid-gap: 0rem;
    grid-template-areas:
      "header header"
      "list sidebar"
      "footer footer";
  }
}

.disabled {
  opacity: 0.3;
}
</style>


