<template>
  <div class="wrapper h-full">
    <app-kasse-liste style="grid-area: liste" />
    <app-kasse-ohne-strichcode style="grid-area: others" />
    <app-kasse-total style="grid-area: total" />
    <app-kasse-anzahl style="grid-area: anzahl" />
    <app-kasse-aktuell style="grid-area: aktuell" />
    <app-kasse-bezahlen style="grid-area: bezahlen" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import appKasseListe from "@/components/KasseListe.vue";
import appKasseOhneStrichcode from "@/components/KasseOhneStrichcode.vue";

import appKasseTotal from "@/components/KasseTotal.vue";
import appKasseAnzahl from "@/components/KasseAnzahl.vue";
import appKasseAktuell from "@/components/KasseAktuell.vue";
import appKasseBezahlen from "@/components/KasseBezahlen.vue";

import useScanner from "../hooks/use-scanner";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    appKasseListe,
    appKasseOhneStrichcode,
    appKasseTotal,
    appKasseAnzahl,
    appKasseAktuell,
    appKasseBezahlen,
  },
  setup() {
    const store = useStore();

    useScanner((code) => {
      store.dispatch("kasse/add", code);
    });
  },
});
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 3rem 4rem 8rem;
  grid-gap: 0.5rem;
  grid-template-areas:
    "liste liste others"
    "total total total"
    "aktuell aktuell aktuell"
    "anzahl anzahl bezahlen";
}

@media (min-width: 600px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 3rem 8rem;
    grid-gap: 0.5rem;
    grid-template-areas:
      "liste liste others"
      "total total total"
      "anzahl aktuell bezahlen";
  }
}
</style>
