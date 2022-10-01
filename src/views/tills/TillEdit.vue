<template>
  <app-till-edit
    :id="props.id"
    :key="`${editing}`"
    :editing="editing"
    :removable="removable"
    :clipboard="clipboard"
    @initiate-product-creation="initiateProductCreation"
  />
</template>

<script lang="ts" setup>
import { computed, toRefs, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

import appTillEdit from "../../components/till/TillEdit.vue";

import useTillStore from "@/store/till";
import useProductStore from "@/store/products";
import { Till, TillClipboard } from "@/types";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const router = useRouter();
const tillStore = useTillStore();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "tills-new")
);

const { id: reactiveId } = toRefs(props);

const removable = computed(() => reactiveId.value !== "default");

const clipboard: TillClipboard | null = tillStore.clipboard;

/* consume clipboard if available */
if (clipboard) {
  const productStore = useProductStore();
  const productClipboard = productStore.clipboard;
  if (productClipboard) {
    clipboard.product = productClipboard;
    productStore.clipboard = null;
  }
  tillStore.clipboard = null;
}

const initiateProductCreation = (v: TillClipboard) => {
  /* clear any possible products in clipboard */
  const productStore = useProductStore();
  productStore.clipboard = null;

  tillStore.clipboard = v;

  router.push("/products/new");
};
</script>
