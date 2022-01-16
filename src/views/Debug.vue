<template>
  <h1>Debug</h1>
  <input v-model="uid" class="input" />
  {{ uid }}
  <button class="btn btn-blue" @click="() => search(uid)">GO</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import db from "@/utils/db";

export default defineComponent({
  setup() {
    const connie = "uHvaGPHeZbWVUgDFSgmbbhJSnYx2";

    const uid = ref(connie);

    const search = async (uid) => {
      var members = db.fs.collectionGroup("members").where("uid", "==", uid);

      try {
        const snap = await members.get();
        snap.forEach((doc) => {
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
