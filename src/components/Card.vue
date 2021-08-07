<template>
  <button
    class="inline-block"
    @click="() => to && router.push(to)"
    :class="wrapperClasses"
  >
    <div
      class="text-center border-solid border-2 border-light-blue-500 shadow-md flex flex-col items-center"
      :class="wrapperClasses"
    >
      <img
        v-if="imageAsset"
        :class="imageClasses"
        :src="require(`@/assets/${imageAsset}`)"
      />
      <app-image-ref
        v-else-if="imageRef"
        :id="imageRef"
        class="flex-shrink-0"
        :class="imageClasses"
      />
      <div
        v-else
        class="flex-shrink-0 opacity-60"
        :class="imageClasses"
        :style="{ background: getColor(label) }"
      ></div>
      <div
        class="h-6 flex flex-col justify-center w-full"
        :class="labelClasses"
      >
        <span class="mx-1 truncate">{{ label }}</span>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import appImageRef from "../components/ImageRef.vue";

export default defineComponent({
  name: "Card",
  components: {
    appImageRef,
  },
  props: {
    imageRef: String,
    imageAsset: String,
    label: String,
    to: [String, Object],
    contain: Boolean,
    responsive: Boolean,
  },
  setup(props) {
    const router = useRouter();

    const wrapperClasses = computed(() => {
      return {
        "w-20": props.responsive,
        "sm:w-40": props.responsive,
        "w-40": !props.responsive,
      };
    });

    const imageClasses = computed(() => {
      return {
        "object-contain": props.contain,
        "sm:h-40": props.responsive,
        "sm:w-40": props.responsive,
        "h-20": props.responsive,
        "w-20": props.responsive,
        "h-40": !props.responsive,
        "w-40": !props.responsive,
      };
    });

    const labelClasses = computed(() => {
      return {
        "text-xs": props.responsive,
        "sm:text-base": props.responsive,
      };
    });

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

    return { router, getColor, wrapperClasses, imageClasses, labelClasses };
  },
});
</script>
