<template>
  <button class="button-confirm inline-flex items-center" @click="onClick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      stroke="white"
      class="inline-block w-10 h-10 mr-1 transform rotate-180"
    >
      <circle r="15" cy="15" cx="15" style="fill: #446dbd; stroke: none" />
      <path
        stroke-linecap="butt"
        stroke-linejoin="round"
        stroke-width="3"
        d="M 12 8 l 7 7 -7 7"
        stroke="white"
      />
    </svg>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { useRouter, RouteLocationRaw } from "vue-router";

const props = defineProps({
  to: {
    type: Object as PropType<RouteLocationRaw | null>,
    default: null,
  },
  replace: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const onClick = () => {
  if (props.to) {
    if (props.replace) {
      router.replace(props.to);
    } else {
      router.push(props.to);
    }
    return;
  }

  router.go(-1);
};
</script>

<style scoped>
.button-confirm {
  @apply py-2 px-4 rounded-md bg-gray-200 text-4xl border-solid border-8 border-gray-300;
}
.button-confirm:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
