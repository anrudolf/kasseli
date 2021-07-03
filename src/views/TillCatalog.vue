<template>
  <div class="p-4" v-if="catalog">
    <app-button-back @click="back">Zurück</app-button-back>
    <div class="mt-6 grid gap-y-4 grid-cols-2 md:grid-cols-4">
      <app-widget
        v-for="(widget, i) in catalog.content"
        :key="i"
        :type="widget.type"
        :widget="widget"
        @click="(ev) => add(widget.id)"
        contain
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

import appWidget from "@/components/Widget.vue";
import appButtonBack from "@/components/ButtonBack.vue";

import useKasseStore from "@/store/kasse";
import useTillStore from "@/store/till";

export default defineComponent({
  components: {
    appWidget,
    appButtonBack,
  },
  props: {
    id: String,
  },
  setup(props) {
    const kasseStore = useKasseStore();
    const tillStore = useTillStore();

    const router = useRouter();

    const catalog = computed(() =>
      tillStore.getDefault?.favorites
        .filter((f) => f.kind === "catalog")
        .find((f) => f.id === props.id)
    );

    const add = (code) => {
      kasseStore.add(code);
      router.push("/");
    };

    return { catalog, add, back: () => router.push("/") };
  },
});
</script>