<template>
  <div class="wrapper h-full">
    <app-kasse-liste style="grid-area: liste" />
    <app-kasse-widget-groups
      style="grid-area: others"
      :entities="widgetGroups"
    />
    <app-kasse-total style="grid-area: total" />
    <app-kasse-anzahl style="grid-area: anzahl" />
    <app-kasse-aktuell style="grid-area: aktuell" />
    <app-kasse-bezahlen style="grid-area: bezahlen" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import appKasseListe from "@/components/KasseListe.vue";
import appKasseWidgetGroups from "@/components/KasseWidgetGroups.vue";

import appKasseTotal from "@/components/KasseTotal.vue";
import appKasseAnzahl from "@/components/KasseAnzahl.vue";
import appKasseAktuell from "@/components/KasseAktuell.vue";
import appKasseBezahlen from "@/components/KasseBezahlen.vue";

import useScanner from "../hooks/use-scanner";

import useKasseStore from "@/store/kasse";
import useTillStore from "@/store/till";

import { Till } from "@/types";

export default defineComponent({
  name: "Home",
  components: {
    appKasseListe,
    appKasseWidgetGroups,
    appKasseTotal,
    appKasseAnzahl,
    appKasseAktuell,
    appKasseBezahlen,
  },
  setup() {
    const kasseStore = useKasseStore();
    const tillStore = useTillStore();

    useScanner((code) => {
      kasseStore.add(code);
    });

    return { widgetGroups: computed(() => tillStore.getDefault?.catalogs) };
  },
});
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 12rem;
  grid-template-rows: 1fr 3rem 6rem 8rem;
  grid-gap: 0.5rem;
  grid-template-areas:
    "liste liste others"
    "total total total"
    "aktuell aktuell aktuell"
    "anzahl anzahl bezahlen";
}

@media (min-width: 768px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr minmax(25rem, 1fr);
    grid-template-rows: 1fr 3rem 8rem;
    grid-gap: 0.5rem;
    grid-template-areas:
      "liste liste others"
      "total total total"
      "anzahl aktuell bezahlen";
  }
}
</style>
