<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-2">
      <h1>Products</h1>
      <router-link
        class="btn btn-blue inline-flex items-center"
        to="/products/new"
      >
        <app-icon icon="plus-circle" class="h-6 w-6" />
        <span class="ml-1">ADD PRODUCT</span>
      </router-link>
    </div>
    <div class="my-2">
      <input v-model="filter" class="input" placeholder="Suche" />
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

    <app-product-list
      :products="filtered"
      @selected="(id) => router.push(`/products/edit?id=${id}`)"
    />
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

import appSelect from "@/components/ui/Select.vue";
import appIcon from "@/components/ui/Icon.vue";
import appProductList from "@/components/product/ProductList.vue";

import dynamicSort from "@/utils/dynamicSort";
import useScanner from "@/hooks/use-scanner";
import useFirestoreCollectionSnapshot from "@/hooks/use-firestore-collection-snapshot";

import db from "@/utils/db";

import { Product } from "@/types";

export default defineComponent({
  components: {
    appSelect,
    appIcon,
    appProductList,
  },
  setup() {
    const router = useRouter();

    const products = ref<Product[]>([]);
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

    useFirestoreCollectionSnapshot(db.products, function (snapshot) {
      const tmp = [] as Product[];
      snapshot.forEach(function (doc) {
        tmp.push({ ...doc.data(), id: doc.id });
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
