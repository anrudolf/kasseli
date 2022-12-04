<template>
  <teleport v-if="settings.tillEdit" to="#context-menu">
    <router-link
      class="inline-flex items-center"
      :to="`/tills/edit?id=${settings.till}`"
    >
      Edit <pencil-icon icon="menu" class="ml-1 w-5 h-5 inline" />
    </router-link>
  </teleport>
  <div class="wrapper h-full">
    <app-kasse-liste style="grid-area: liste" />
    <app-kasse-favorites style="grid-area: others" :entities="favorites" />
    <app-kasse-total style="grid-area: total" />
    <app-kasse-anzahl style="grid-area: anzahl" />
    <app-kasse-aktuell style="grid-area: aktuell" />
    <app-kasse-bezahlen style="grid-area: bezahlen" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { PencilIcon } from "@heroicons/vue/24/solid";

import appKasseListe from "@/components/kasse/KasseListe.vue";
import appKasseFavorites from "@/components/kasse/KasseFavorites.vue";

import appKasseTotal from "@/components/kasse/KasseTotal.vue";
import appKasseAnzahl from "@/components/kasse/KasseAnzahl.vue";
import appKasseAktuell from "@/components/kasse/KasseAktuell.vue";
import appKasseBezahlen from "@/components/kasse/KasseBezahlen.vue";

import useScanner from "../hooks/use-scanner";

import useKasseStore from "@/store/kasse";
import useTillStore from "@/store/till";
import useSettingsStore from "@/store/settings";

const kasseStore = useKasseStore();
const tillStore = useTillStore();
const settings = useSettingsStore();

useScanner((code) => {
  kasseStore.add(code);
});

const favorites = computed(() => {
  const till = tillStore.getTill;
  if (!till) {
    return [];
  }
  return till.favorites;
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr clamp(1rem, 7vh, 3rem) clamp(5rem, 20vh, 8rem);
    grid-gap: clamp(0.125rem, 1.5vh, 0.5rem);
    grid-template-areas:
      "liste liste others"
      "total total total"
      "anzahl aktuell bezahlen";
  }
}
</style>
