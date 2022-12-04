<template>
  <teleport v-if="settings.tillEdit" to="#context-menu">
    <router-link
      class="inline-flex items-center"
      :to="`/tills/edit?id=${settings.till}#catalog-${id}`"
    >
      Edit <pencil-icon icon="menu" class="ml-1 w-5 h-5 inline" />
    </router-link>
  </teleport>
  <div v-if="catalog" class="p-4">
    <app-button-back>Zurück</app-button-back>
    <div class="wrapper mt-4">
      <app-widget
        v-for="(widget, i) in catalog.content"
        :key="i"
        :kind="widget.kind"
        :widget="widget"
        contain
        @click="(ev) => add(widget.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

import appWidget from "@/components/ui/Widget.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import { PencilIcon } from "@heroicons/vue/24/solid";

import useSettingsStore from "@/store/settings";
import useKasseStore from "@/store/kasse";
import useTillStore from "@/store/till";
import { TillCatalog } from "@/types";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const kasseStore = useKasseStore();
const tillStore = useTillStore();
const settings = useSettingsStore();

const router = useRouter();

const catalog = computed(
  () =>
    tillStore.getTill?.favorites
      .filter((f) => f.kind === "catalog")
      .find((f) => f.id === props.id) as TillCatalog
);

const add = (code: string) => {
  kasseStore.add(code);
  router.push("/");
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
  }
}
</style>
