<template>
  <app-till-edit
    :id="props.id"
    :key="`${editing}`"
    :editing="editing"
    :removable="removable"
  />
</template>

<script lang="ts" setup>
import { computed, toRefs, defineProps } from "vue";
import { useRoute } from "vue-router";

import appTillEdit from "../../components/till/TillEdit.vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const route = useRoute();

const editing = computed(
  () => !route.matched.some(({ name }) => name === "tills-new")
);

const { id: reactiveId } = toRefs(props);

const removable = computed(() => reactiveId.value !== "default");
</script>
