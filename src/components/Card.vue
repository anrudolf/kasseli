<template>
  <router-link class="inline-block" v-if="to" :to="to">
    <div
      class="h-48 w-48 text-center border-solid border-2 border-light-blue-500 shadow-md flex flex-col items-center"
    >
      <app-image-ref
        v-if="imageRef"
        :id="imageRef"
        class="object-stretch h-40 w-48"
      />
      <div class="mt-auto mb-0.5">
        {{ label }}
      </div>
    </div>
  </router-link>
  <button class="inline-block" v-else>
    <div
      class="h-48 w-48 text-center border-solid border-2 border-light-blue-500 shadow-md flex flex-col items-center"
    >
      <app-image-ref
        v-if="imageRef"
        :id="imageRef"
        class="object-stretch h-40 w-48"
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
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>

<style scoped>
</style>>
