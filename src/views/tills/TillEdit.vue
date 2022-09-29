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
import { Till, TillClipboard } from "@/types";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const router = useRouter();
const store = useTillStore();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "tills-new")
);

const { id: reactiveId } = toRefs(props);

const removable = computed(() => reactiveId.value !== "default");

const clipboard: TillClipboard | null = store.clipboard;
if (clipboard) {
  store.clipboard = null;
}

const initiateProductCreation = ({
  till,
  path,
}: {
  till: Till;
  path: string;
}) => {
  store.clipboard = { till, path };

  router.push("/products/new");
};
</script>
