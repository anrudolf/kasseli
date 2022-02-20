<template>
  <div class="p-4 max-w-md">
    <div class="flex flex-col space-y-2">
      <h1>Debug</h1>
      <label>UID</label>
      <input v-model="uid" class="input" />
      <button class="btn btn-blue" @click="() => search(uid)">
        Query Workspaces
      </button>
    </div>
    <div class="my-2 flex flex-col space-y-1">
      <h2>Trials</h2>
      <input v-model="trialId" class="input" placeholder="id" />
      <input v-model="trialCode" class="input" placeholder="code" />
      <button class="btn btn-blue" @click="addTrial(trialId, trialCode)">
        Add trial
      </button>
      <button class="btn btn-blue" @click="getTrials">Get trials</button>
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

<script lang="ts" setup>
import { ref } from "vue";
import {
  collectionGroup,
  getDocs,
  query,
  where,
  getFirestore,
  getDoc,
  doc,
  collection,
  setDoc,
} from "firebase/firestore";

import db from "@/utils/db";
import refactor from "@/utils/refactor";

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

const addTrial = (id: string, code: string) => {
  const d = doc(getFirestore(), "trials", id);
  setDoc(d, { code: code });
};

const getTrials = () => {
  const c = collection(getFirestore(), "trials");
  getDocs(c)
    .then((snap) => {
      snap.forEach((s) => {
        if (s.exists()) {
          console.log(s.data());
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const trialId = ref("");
const trialCode = ref("");
</script>
