<template>
  <h1>Debug</h1>
  <input v-model="uid" class="input" />
  {{ uid }}
  <button class="btn btn-blue" @click="() => search(uid)">GO</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

import db from "@/utils/db";

export default defineComponent({
  setup() {
    const connie = "uHvaGPHeZbWVUgDFSgmbbhJSnYx2";

    const uid = ref(connie);

    const search = async (uid) => {
      const mq = query(
        collectionGroup(db.fs, "members"),
        where("uid", "==", uid)
      );

      try {
        const members = await getDocs(mq);

        members.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (e) {
        console.log(e);
      }
    };

    return {
      uid,
      search,
    };
  },
});
</script>
