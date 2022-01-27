<template>
  <div
    v-if="props.modelValue"
    class="
      bg-red-100
      text-gray-500
      p-2
      rounded
      flex
      items-center
      justify-between
    "
  >
    <exclamation-circle-icon
      class="w-8 h-8 inline text-red-400"
    ></exclamation-circle-icon>
    {{ props.modelValue }}
    <button @click="emit('update:modelValue', '')">
      <x-icon class="w-6 h-6 inline text-gray-500"></x-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { ExclamationCircleIcon, XIcon } from "@heroicons/vue/outline";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
</script>
