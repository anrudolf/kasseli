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

    <table class="my-3 min-w-full table-auto shadow-lg bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left">Label</th>
          <th class="text-right">id</th>
          <th class="text-right">Price</th>
          <th class="text-right">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filtered" :key="product.id">
          <td class="text-left">{{ product.label.de }}</td>
          <td class="text-right">{{ product.id }}</td>
          <td class="text-right">{{ product.price.toFixed(2) }}</td>
          <td class="flex justify-end">
            <router-link
              :to="`/products/edit?id=${product.id}`"
              class="text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import firebase from "../firebaseInit";
import appSelect from "../components/Select.vue";
import appIcon from "../components/Icon.vue";

const db = firebase.firestore();

function dynamicSort(property, lang = "de") {
  let sortOrder = 1;
  if (property[0] === "-" || property[0] === "+") {
    sortOrder = property[0] === "-" ? -1 : 1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (property === "label") {
      const result =
        a["label"][lang] < b["label"][lang]
          ? -1
          : a["label"][lang] > b["label"][lang]
          ? 1
          : 0;
      return result * sortOrder;
    }

    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export default {
  components: {
    appSelect,
    appIcon,
  },
  setup() {
    const products = ref([]);
    const modal = reactive({ visible: false });
    const sortOrder = ref(1);
    const sort = ref("id");
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
        console.log(doc.id, " => ", doc.data());
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

    return {
      filter,
      products,
      modal,
      sorted,
      filtered,
      sort,
      sortOrder,
      sortOptions,
    };
  },
};
</script>

<style scoped>
td,
th {
  padding: 12px;
}
</style>