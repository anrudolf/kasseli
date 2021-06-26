<template>
  <button
    class="inline-block w-20 sm:w-40"
    @click="() => to && router.push(to)"
  >
    <div
      class="w-20 sm:w-40 text-center border-solid border-2 border-light-blue-500 shadow-md flex flex-col items-center"
    >
      <app-image-ref
        v-if="imageRef"
        :id="imageRef"
        class="h-20 w-20 sm:h-40 sm:w-40 flex-shrink-0"
        :class="{ 'object-contain': contain }"
      />
      <div class="h-6 flex flex-col justify-center text-xs sm:text-base">
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
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>
