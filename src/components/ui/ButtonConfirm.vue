<template>
  <button class="button-confirm flex justify-center items-center">
    <slot></slot>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      stroke="white"
      class="inline-block w-10 h-10 ml-1"
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
  </button>
</template>

<style scoped>
.button-confirm {
  @apply py-2 px-4 rounded-md bg-gray-200 border-solid border-8 border-gray-300;
  font-size: clamp(1.125rem, 5vw, 2.25rem);
  line-height: clamp(1.75rem, 2.5vw, 2.5rem);
}
.button-confirm:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
