<template>
  <div class="wrapper flex gap-3 items-stretch">
    <div>
      <button
        class="bg-orange-400"
        :class="props.item.status == OrderStatus.NEW ? 'active' : 'inactive'"
        @click="setStatus(OrderStatus.NEW)"
      ></button>
    </div>
    <div>
      <button
        class="bg-yellow-400"
        :class="
          props.item.status == OrderStatus.PREPARING ? 'active' : 'inactive'
        "
        @click="setStatus(OrderStatus.PREPARING)"
      ></button>
    </div>
    <div>
      <button
        class="bg-green-400"
        :class="props.item.status == OrderStatus.READY ? 'active' : 'inactive'"
        @click="setStatus(OrderStatus.READY)"
      ></button>
    </div>
    <div>
      <button
        class="bg-blue-400"
        :class="
          props.item.status == OrderStatus.COMPLETE ? 'active' : 'inactive'
        "
        @click="setStatus(OrderStatus.COMPLETE)"
      ></button>
    </div>
  </div>
</template>
status
<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from "vue";

import { OrderItem, OrderStatus } from "@/types";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  item: {
    type: Object as PropType<OrderItem>,
    required: true,
  },
});

const emit = defineEmits<{
  (
    e: "set-order-item-status",
    v: { id: string; items: number | number[]; status: OrderStatus }
  );
}>();

const setStatus = (status: OrderStatus) => {
  emit("set-order-item-status", {
    id: props.id,
    items: props.item.idx,
    status: status,
  });
};
</script>

<style scoped>
.wrapper > div {
  @apply w-6 h-6 flex items-start;
}

button {
  @apply w-6 h-6 rounded-full opacity-80;
}

.inactive {
  @apply border-8;
}
</style>
