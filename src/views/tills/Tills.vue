<template>
  <div class="p-4 max-w-lg">
    <app-button-back>Zurück</app-button-back>
    <h1 class="my-3">Kassen</h1>

    <h2>Standard</h2>
    <div
      v-if="defaultTill"
      class="rounded mt-2 flex items-center border-2"
      :class="{ selected: defaultTill.id === settings.till }"
    >
      <button
        class="p-2 flex-grow"
        @click="defaultTill && settings.setTill(defaultTill.id)"
      >
        <div class="flex items-center space-x-2 w-full">
          <div class="w-12 h-12 flex items-center">
            <app-image-ref
              v-if="defaultTill.imageRef"
              :id="defaultTill.imageRef"
            />
            <div
              v-else
              :style="{ background: getColor(defaultTill.label.de) }"
              class="w-full h-full"
            ></div>
          </div>
          <span class="text-2xl">{{ defaultTill.label.de }}</span>
        </div>
      </button>
      <router-link
        :to="`/tills/edit?id=${defaultTill.id}`"
        class="uppercase mx-2 link"
        ><div class="flex items-center"><span>Edit</span></div></router-link
      >
    </div>

    <div class="mt-6 flex justify-between items-center">
      <h2>Andere</h2>
      <router-link
        to="/tills/new"
        class="btn btn-blue inline-flex items-center"
      >
        <app-icon icon="plus" class="w-5 h-5 mr-1" />
        ADD
      </router-link>
    </div>
    <ul>
      <li
        v-for="till in tills"
        :key="till.id"
        class="rounded mt-2 flex items-center border-2"
        :class="{ selected: till.id === settings.till }"
      >
        <button class="p-2 flex-grow" @click="settings.setTill(till.id)">
          <div class="flex items-center space-x-2 w-full">
            <div class="w-12 h-12 flex items-center">
              <app-image-ref v-if="till.imageRef" :id="till.imageRef" />
              <div
                v-else
                :style="{ background: getColor(till.label.de) }"
                class="w-full h-full"
              ></div>
            </div>
            <span class="text-2xl">{{ till.label.de }}</span>
          </div>
        </button>
        <router-link
          :to="`/tills/edit?id=${till.id}`"
          class="uppercase mx-2 link"
          ><div class="flex items-center"><span>Edit</span></div></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import useFirestoreCollectionSnapshot from "../../hooks/use-firestore-collection-snapshot";
import appIcon from "@/components/ui/Icon.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import appImageRef from "@/components/image/ImageRef.vue";

import useSettings from "@/store/settings";

import db from "@/services/db";
import { getColor } from "@/utils";

import { Till } from "@/types";

const defaultTill = ref<Till | null>(null);
const tills = ref<Till[]>([]);
const settings = useSettings();

useFirestoreCollectionSnapshot(db.tills, function (snapshot) {
  const tmp = [] as Till[];
  snapshot.forEach(function (doc) {
    const till = { ...doc.data(), id: doc.id };

    if (till.id === "default") {
      defaultTill.value = till;
      return;
    }

    tmp.push(till);
  });
  tills.value = [];
  tills.value.push(...tmp);
});
</script>

<style>
.selected {
  @apply border-indigo-500;
}
</style>
