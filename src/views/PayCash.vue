<template>
  <draggable
    class="dragArea flex justify-center items-center relative h-48 w-48 border"
    :list="list2"
    group="people"
    @change="log"
    item-key="name"
  >
    <app-money-bill
      v-for="(element, i) in list2"
      :key="`${element.id}-${i}`"
      class="absolute p-3 inline-block m-1 w-20"
      :style="{ transform: `rotate(${3 * i}deg)` }"
      :amount="element.id"
    />
  </draggable>

  <draggable
    class="dragArea flex items-start"
    :list="list1"
    :group="{ name: 'people', pull: 'clone', put: false }"
    @change="log"
    item-key="name"
  >
    <app-money-bill
      v-for="element in list1"
      :key="element.id"
      class="cursor-pointer m-2 inline-block w-24"
      :amount="element.id"
      @click="add(element)"
    />
  </draggable>
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
        { name: "10 CHF", id: 10 },
        { name: "20 CHF", id: 20 },
        { name: "50 CHF", id: 50 },
        { name: "100 CHF", id: 100 },
        { name: "200 CHF", id: 200 },
      ],
      list2: [],
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