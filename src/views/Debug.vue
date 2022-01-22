<template>
  <h1>Debug</h1>
  <input v-model="uid" class="input" />
  {{ uid }}
  <button class="btn btn-blue" @click="() => search(uid)">GO</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

import { getFirestore, getDoc, doc } from "firebase/firestore";

import db from "@/utils/db";

export default defineComponent({
  setup() {
    const connie = "uHvaGPHeZbWVUgDFSgmbbhJSnYx2";

    const uid = ref(connie);

    const search = async (uid) => {
      const mq = query(
        collectionGroup(getFirestore(), "members"),
        where("uid", "==", uid)
      );

      try {
        const members = await getDocs(mq);

        members.forEach(async (m) => {
          const workspaceRef = m.ref.parent.parent;
          if (!workspaceRef) {
            return;
          }

          const workspace = await getDoc(doc(db.workspaces, workspaceRef.id));

          console.log(m.id, " => ", m.data(), "parent:", workspace.data());
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
