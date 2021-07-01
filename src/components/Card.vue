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
        v-else
        class="flex-shrink-0 opacity-60"
        :class="{
          'object-contain': contain,
          'sm:h-40': responsive,
          'sm:w-40': responsive,
          'h-20': responsive,
          'w-20': responsive,
          'h-40': !responsive,
          'w-40': !responsive,
        }"
        :style="{ background: getColor(label) }"
      ></div>
      <div
        class="h-6 flex flex-col justify-center w-full"
        :class="{
          'text-xs': responsive,
          'sm:text-base': responsive,
        }"
      >
        <span class="mx-1 truncate">{{ label }}</span>
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

    // from https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
    const getColor = (str) => {
      let hash = 0;
      if (!str || str.length === 0) return hash;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
      }
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
      }
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    };

    return { router, getColor };
  },
});
</script>
