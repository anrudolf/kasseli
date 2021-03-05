<template>
  <div class="wrapper h-full">
    <app-kasse-liste style="grid-area: liste" />
    <app-kasse-cards style="grid-area: others" :entities="cards" />
    <app-kasse-total style="grid-area: total" />
    <app-kasse-anzahl style="grid-area: anzahl" />
    <app-kasse-aktuell style="grid-area: aktuell" />
    <app-kasse-bezahlen style="grid-area: bezahlen" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import appKasseListe from "@/components/KasseListe.vue";
import appKasseCards from "@/components/KasseCards.vue";

import appKasseTotal from "@/components/KasseTotal.vue";
import appKasseAnzahl from "@/components/KasseAnzahl.vue";
import appKasseAktuell from "@/components/KasseAktuell.vue";
import appKasseBezahlen from "@/components/KasseBezahlen.vue";

import useScanner from "../hooks/use-scanner";
import { useStore } from "vuex";

import useFirestoreCollectionSnapshot from "../hooks/use-firestore-collection-snapshot";

export default defineComponent({
  name: "Home",
  components: {
    appKasseListe,
    appKasseCards,
    appKasseTotal,
    appKasseAnzahl,
    appKasseAktuell,
    appKasseBezahlen,
  },
  setup() {
    const store = useStore();
    const cards = ref([]);

    useScanner((code) => {
      store.dispatch("kasse/add", code);
    });

    useFirestoreCollectionSnapshot("cards", function (snapshot) {
      const tmp = [];
      snapshot.forEach(function (doc) {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      cards.value = [];
      cards.value.push(...tmp);
    });

    return { cards };
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
