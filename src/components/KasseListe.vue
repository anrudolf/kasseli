<template>
  <div class="flex">
    <ul class="wrapper" :style="`grid-template-rows: repeat(${pageSize}, 1fr)`">
      <li
        v-for="(item, i) in displayedItems"
        :key="item.code"
        @click="select(i)"
        class="cursor-pointer"
      >
        <app-kasse-liste-item
          :quantity="item.quantity"
          :label="item.product.label.de"
          :price="item.price"
        />
      </li>
    </ul>
    <div class="flex flex-col mx-3">
      <button
        class="my-1 rounded border-2 w-12 h-12 flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200"
        @click="$store.dispatch('kasse/prev')"
        :disabled="!hasPrev"
        :class="{ disabled: !hasPrev }"
      >
        <app-icon icon="arrow-page-up" color="gray" />
      </button>
      <button
        class="mt-6 rounded border-2 w-12 h-12 flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200"
        @click="$store.dispatch('kasse/next')"
        :disabled="!hasNext"
        :class="{ disabled: !hasNext }"
      >
        <app-icon icon="arrow-page-down" color="gray" />
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import appKasseListeItem from "@/components/KasseListeItem.vue";
import appIcon from "@/components/Icon.vue";

export default defineComponent({
  name: "KasseListe",
  components: {
    appKasseListeItem,
    appIcon,
  },
  computed: {
    items() {
      return this.$store.getters["kasse/items"];
    },
    offset() {
      return this.$store.getters["kasse/offset"];
    },
    displayedItems() {
      return this.$store.getters["kasse/displayedItems"];
    },
    pageSize() {
      return this.$store.getters["kasse/pageSize"];
    },
    hasPrev() {
      return this.$store.getters["kasse/hasPrev"];
    },
    hasNext() {
      return this.$store.getters["kasse/hasNext"];
    },
  },
  methods: {
    select(i) {
      let index;
      if (this.items.length <= this.pageSize) {
        index = i;
      } else {
        index = this.items.length - this.pageSize + i - this.offset;
      }

      this.$store.dispatch("kasse/select", index);
    },
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

/* TODO: dynamic on pageSize */
.wrapper {
  display: grid;
  grid-template-columns: 1fr;

  /*grid-template-rows: repeat(3, 1fr);*/
}

.disabled {
  opacity: 0.3;
}
</style>


