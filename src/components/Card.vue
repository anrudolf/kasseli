<template>
  <button class="inline-block w-48" @click="() => to && router.push(to)">
    <div
      class="h-48 w-48 text-center border-solid border-2 border-light-blue-500 shadow-md flex flex-col items-center"
    >
      <app-image-ref
        v-if="imageRef"
        :id="imageRef"
        class="h-40 w-48"
        :class="{ 'object-contain': contain }"
      />
      <div class="mt-auto mb-0.5">
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
