<template>
  <svg
    v-if="icon === 'sort-ascending'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    :fill="color"
    class="w-5 h-5"
  >
    <path
      d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
    />
  </svg>
  <svg
    v-else-if="icon === 'sort-descending'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    :fill="color"
    class="w-5 h-5"
  >
    <path
      d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
    />
  </svg>
  <svg
    v-else-if="icon === 'menu'"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    :stroke="color"
    class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
  <svg
    v-else-if="icon === 'arrow-narrow-up'"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 7l4-4m0 0l4 4m-4-4v18"
    />
  </svg>
  <svg
    v-else-if="icon === 'arrow-narrow-down'"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M16 17l-4 4m0 0l-4-4m4 4V3"
    />
  </svg>
  <svg
    v-else-if="icon === 'arrow-page-up'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :fill="color"
    class="w-5 h-5"
  >
    <path
      fill-rule="evenodd"
      d="M 12 0 L 3 8 L 3 12 L 10 5.7773438 L 10 24 L 14 24 L 14 5.7773438 L 21 12 L 21 8 L 12 0 z "
    />
  </svg>
  <svg
    v-else-if="icon === 'arrow-page-down'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :fill="color"
    class="w-5 h-5"
  >
    <path
      fill-rule="evenodd"
      d="M 12,24 3,16 v -4 l 7,6.22266 V 0 h 4 V 18.22266 L 21,12 v 4 z"
    />
  </svg>
  <svg
    v-else-if="icon === 'plus'"
    class="w-4 h-4 mr-1 inline"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clip-rule="evenodd"
    />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    :fill="color"
  >
    <path
      fill-rule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "question-mark-circle",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>