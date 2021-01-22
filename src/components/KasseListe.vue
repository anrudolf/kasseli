<template>
  <div>
    <ul class="wrapper">
      <li
        v-for="(item, i) in items"
        :key="item.code"
        @click="select(i)"
        class="cursor-pointer"
      >
        {{ item.product.label.de }} {{ item.quantity }}
        {{ item.quantity * item.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "KasseListe",
  computed: {
    items() {
      return this.$store.getters["kasse/items"];
    },
  },
  methods: {
    select(index) {
      this.$store.dispatch("kasse/select", index);
    },
  },
});
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
}
li:nth-child(odd) {
  color: #777;
  background: #eee;
}
li:nth-child(even) {
  color: #777;
  background: #fff;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
}
</style>


