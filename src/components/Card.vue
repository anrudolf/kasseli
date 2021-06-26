<template>
  <button
    class="inline-block"
    @click="() => to && router.push(to)"
    :class="{
      'w-20': responsive,
      'sm:w-40': responsive,
      'w-40': !responsive,
    }"
  >
    <div
      class="text-center border-solid border-2 border-light-blue-500 shadow-md flex flex-col items-center"
      :class="{
        'w-20': responsive,
        'sm:w-40': responsive,
        'w-40': !responsive,
      }"
    >
      <app-image-ref
        v-if="imageRef"
        :id="imageRef"
        class="flex-shrink-0"
        :class="{
          'object-contain': contain,
          'sm:h-40': responsive,
          'sm:w-40': responsive,
          'h-20': responsive,
          'w-20': responsive,
          'h-40': !responsive,
          'w-40': !responsive,
        }"
      />
      <div
        class="h-6 flex flex-col justify-center"
        :class="{
          'text-xs': responsive,
          'sm:text-base': responsive,
        }"
      >
        {{ label }}
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import appImageRef from "../components/ImageRef.vue";

export default defineComponent({
  name: "Widget",
  components: {
    appImageRef,
  },
  props: {
    imageRef: String,
    label: String,
    to: [String, Object],
    contain: Boolean,
    responsive: Boolean,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>
