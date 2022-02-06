<template>
  <SwitchGroup class="my-2">
    <div class="flex items-center">
      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
        class="
          relative
          inline-flex
          items-center
          h-6
          transition-colors
          rounded-full
          w-11
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-1'"
          class="
            inline-block
            w-4
            h-4
            transition-transform
            transform
            bg-white
            rounded-full
          "
        />
      </Switch>
      <SwitchLabel class="ml-2"><slot></slot></SwitchLabel>
    </div>
  </SwitchGroup>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();

const enabled = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
