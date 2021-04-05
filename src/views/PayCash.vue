<template>
  <app-money-bill :amount="20" />

  <div class="relative h-32 p-8">
    <h3>Basket</h3>
    <draggable
      class="dragArea list-group"
      :list="list2"
      group="people"
      @change="log"
      item-key="name"
    >
      <div
        v-for="(element, i) in list2"
        :key="`${element.id}-${i}`"
        class="absolute p-3 border inline-block m-1"
        :style="{ transform: `rotate(${2 * i}deg)` }"
      >
        {{ element.name }}
      </div>
    </draggable>
  </div>

  <div class="">
    <h3>Cash</h3>
    <draggable
      class="dragArea list-group"
      :list="list1"
      :group="{ name: 'people', pull: 'clone', put: false }"
      @change="log"
      item-key="name"
    >
      <div
        v-for="element in list1"
        :key="element.id"
        class="cursor-pointer p-3 border inline-block m-1"
        @click="add(element)"
      >
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

import appMoneyBill from "@/components/MoneyBill.vue";

export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable: VueDraggableNext,
    appMoneyBill,
  },
  data() {
    return {
      list1: [
        { name: "200 CHF", id: 200 },
        { name: "100 CHF", id: 100 },
        { name: "50 CHF", id: 50 },
        { name: "20 CHF", id: 20 },
        { name: "10 CHF", id: 10 },
      ],
      list2: [
        { name: "20 CHF", id: 20 },
        { name: "10 CHF", id: 10 },
      ],
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    add(item) {
      this.list2.push({ ...item });
    },
  },
};
</script>
<style scoped></style>