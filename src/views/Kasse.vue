<template>
  <div class="wrapper h-full">
    <app-kasse-liste style="grid-area: liste" />
    <app-kasse-catalogs style="grid-area: others" :entities="catalogs" />
    <app-kasse-total style="grid-area: total" />
    <app-kasse-anzahl style="grid-area: anzahl" />
    <app-kasse-aktuell style="grid-area: aktuell" />
    <app-kasse-bezahlen style="grid-area: bezahlen" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import appKasseListe from "@/components/KasseListe.vue";
import appKasseCatalogs from "@/components/KasseCatalogs.vue";

import appKasseTotal from "@/components/KasseTotal.vue";
import appKasseAnzahl from "@/components/KasseAnzahl.vue";
import appKasseAktuell from "@/components/KasseAktuell.vue";
import appKasseBezahlen from "@/components/KasseBezahlen.vue";

import useScanner from "../hooks/use-scanner";

import useKasseStore from "@/store/kasse";
import useTillStore from "@/store/till";

export default defineComponent({
  name: "Home",
  components: {
    appKasseListe,
    appKasseCatalogs,
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

    return { catalogs: computed(() => tillStore.getDefault?.catalogs) };
  },
});
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 96px;
  grid-template-rows: 1fr 2rem 5rem 7rem 5rem;
  grid-gap: 0.25rem;
  grid-template-areas:
    "liste liste others"
    "total total total"
    "aktuell aktuell aktuell"
    "anzahl anzahl anzahl"
    "bezahlen bezahlen bezahlen";
}

@media (min-width: 640px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr minmax(16rem, 1fr);
    grid-template-rows: 1fr 3rem 8rem;
    grid-gap: 0.5rem;
    grid-template-areas:
      "liste liste others"
      "total total total"
      "anzahl aktuell bezahlen";
  }
}
</style>
