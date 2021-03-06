<template>
  <app-widget-group-edit
    :key="editing"
    :editing="editing"
    :editId="editId"
    :newId="newId"
  />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

import appWidgetGroupEdit from "../components/WidgetGroupEdit.vue";

export default {
  props: ["editId", "newId"],
  components: {
    appWidgetGroupEdit,
  },
  setup() {
    const route = useRoute();

    const editing = computed(
      () => !route.matched.some(({ name }) => name === "widget-groups-new")
    );

    return { editing };
  },
};
</script>