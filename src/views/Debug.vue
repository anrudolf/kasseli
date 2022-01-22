<template>
  <div class="p-4">
    <div class="flex flex-col space-y-2">
      <h1>Debug</h1>
      <label>UID</label>
      <input v-model="uid" class="input" />
      <button class="btn btn-blue" @click="() => search(uid)">
        Query Workspaces
      </button>
    </div>
    <div class="flex flex-col space-y-2 mt-4">
      <h2>Refactor</h2>
      <button class="btn btn-blue" @click="() => refactor.refactorProducts()">
        Refactor Products
      </button>
      <button class="btn btn-blue" @click="() => refactor.refactorTills()">
        Refactor Tills
      </button>
      <button
        class="btn btn-blue"
        @click="() => refactor.refactorAppPayments()"
      >
        Refactor App Payments
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {
  collectionGroup,
  getDocs,
  query,
  where,
  getFirestore,
  getDoc,
  doc,
  collection,
  updateDoc,
  deleteField,
} from "firebase/firestore";

import db from "@/utils/db";
import refactor from "@/utils/refactor";

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
      refactor,
    };
  },
});
</script>
