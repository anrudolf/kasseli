<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl">Products</h1>
      <router-link
        class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded flex items-center"
        to="/products/new"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6 inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="ml-1">ADD PRODUCT</span>
      </router-link>
    </div>
    <div class="my-2">
      <input class="input" placeholder="Suche" v-model="filter" />
    </div>

    <div class="my-1 w-full">
      <app-select v-model="sort" :items="sortOptions" />
      <button
        class="mx-2 border rounded p-2 pl-4"
        @click="sortOrder = -sortOrder"
      >
        {{ sortOrder === 1 ? "Aufsteigend" : "Absteigend" }}
        <app-icon
          class="inline ml-2"
          color="gray"
          :icon="sortOrder === 1 ? 'sort-ascending' : 'sort-descending'"
        />
      </button>
    </div>

    <app-product-list :products="filtered" />
  </div>
</template>

<script>
import { reactive, ref, computed, defineComponent } from "vue";
import firebase from "../firebaseInit";
import appSelect from "../components/Select.vue";
import appIcon from "../components/Icon.vue";
import appProductList from "../components/ProductList.vue";

import dynamicSort from "../utils/dynamicSort";
import useScanner from "../hooks/use-scanner";
import { useRouter } from "vue-router";

const db = firebase.firestore();

export default defineComponent({
  components: {
    appSelect,
    appIcon,
    appProductList,
  },
  setup() {
    const router = useRouter();

    const products = ref([]);
    const modal = reactive({ visible: false });
    const sortOrder = ref(-1);
    const sort = ref("created");
    const filter = ref("");
    const sortOptions = [
      { text: "ID", value: "id" },
      { text: "Label", value: "label" },
      { text: "Preis", value: "price" },
      { text: "Datum", value: "created" },
    ];

    db.collection("products").onSnapshot(function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      products.value = [];
      products.value.push(...tmp);
    });

    const sorted = computed(() => {
      return products.value.sort(
        dynamicSort(`${sortOrder.value === 1 ? "+" : "-"}${sort.value}`)
      );
    });

    const filtered = computed(() => {
      return sorted.value.filter(
        (p) =>
          (p && p.label.de.toLowerCase().includes(filter.value)) ||
          p.id === filter.value
      );
    });

    useScanner((v) => {
      const found = products.value.find((x) => x.id === v);
      if (found) {
        router.push(`/products/edit?id=${v}`);
        return;
      }
      // TODO: sanity check v for length, characters, etc.
      router.push(`/products/new?id=${v}`);
    });

    return {
      filter,
      products,
      modal,
      sorted,
      filtered,
      sort,
      sortOrder,
      sortOptions,
      router,
    };
  },
});
</script>

