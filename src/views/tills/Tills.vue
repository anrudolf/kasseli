<template>
  <div class="p-4 max-w-lg">
    <div class="flex justify-between items-center">
      <h1>Kassen</h1>
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
        class="border rounded mt-2 flex items-center"
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
          class="uppercase text-blue-500 mx-2"
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

import appImageRef from "@/components/image/ImageRef.vue";

import useSettings from "@/store/settings";

import db from "@/utils/db";
import { getColor } from "@/utils";

import { Till } from "@/types";

const tills = ref<Till[]>([]);
const settings = useSettings();

useFirestoreCollectionSnapshot(db.tills, function (snapshot) {
  const tmp = [] as Till[];
  snapshot.forEach(function (doc) {
    tmp.push({ ...doc.data(), id: doc.id });
  });
  tills.value = [];
  tills.value.push(...tmp);
});
</script>
