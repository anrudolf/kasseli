<template>
  <button
    :class="{
      'box-width-responsive': props.responsive,
      'box-width': !props.responsive,
    }"
    @click="() => to && router.push(to)"
  >
    <div
      class="
        text-center
        border-solid border-2 border-light-blue-500
        shadow-md
        flex flex-col
        items-center
      "
    >
      <img
        v-if="imageAsset"
        :class="imageClasses"
        :src="getAssetSrc(imageAsset)"
      />
      <app-image-ref
        v-else-if="imageRef"
        :id="imageRef"
        class="flex-shrink-0"
        :class="imageClasses"
      />
      <div v-else-if="hasDefaultSlot()" :class="imageClasses">
        <slot></slot>
      </div>
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

<script lang="ts" setup>
import { computed, PropType, defineProps, useSlots } from "vue";
import { useRouter } from "vue-router";
import appImageRef from "@/components/image/ImageRef.vue";

import { getColor } from "@/utils";

const slots = useSlots();

const props = defineProps({
  imageRef: { type: String as PropType<string | null>, default: "" },
  imageAsset: { type: String, default: "" },
  label: { type: String, default: "" },
  to: { type: [String, Object], default: null },
  contain: Boolean,
  responsive: Boolean,
});

const router = useRouter();

const imageClasses = computed(() => {
  return {
    "object-contain": props.contain,
    bounds: true,
    "box-width-responsive": props.responsive,
    "box-height-responsive": props.responsive,
    "box-width": !props.responsive,
    "box-height": !props.responsive,
  };
});

const labelClasses = computed(() => {
  return {
    "text-xs": props.responsive,
    "sm:text-base": props.responsive,
  };
});

// https://vitejs.dev/guide/features.html#glob-import
const getAssetSrc = (name: string) => {
  const path = `/src/assets/${name}`;
  const modules = import.meta.globEager("/src/assets/*");
  return modules[path].default;
};

const hasSlot = (name: string) => !!slots[name];
const hasDefaultSlot = () => hasSlot("default");
</script>

<style scoped>
.box-width,
.box-width-responsive {
  width: 5rem;
}

.box-height,
.box-height-responsive {
  height: 5rem;
}

@media (min-width: 640px) {
  .box-width-responsive {
    width: clamp(6rem, 20vh, 10rem);
  }

  .box-height-responsive {
    height: clamp(6rem, 20vh, 10rem);
  }

  .box-width {
    width: 10rem;
  }

  .box-height {
    height: 10rem;
  }
}
</style>
