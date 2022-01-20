import { ref, onUnmounted } from "vue";

import { AppPayment, AppPaymentStatus } from "@/types";

import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

import { db } from "../utils/db";

const CODE_RANGE = [1000, 9999];

export default function (id = "") {
  const entity = ref<AppPayment | null>(null);
  const error = ref(0);

  if (id) {
    getDoc(doc(db.appPayments, id))
      .then((doc) => {
        if (!doc.exists) {
          error.value = 404;
          return;
        }

        const data = doc.data();
        if (!data) {
          error.value = 404;
          return;
        }
        entity.value = { ...data, id: doc.id };
      })
      .catch(() => {
        error.value = 500;
      });
  }

  function randomXToY(minVal, maxVal) {
    const randVal = minVal + Math.random() * (maxVal - minVal);
    return Math.round(randVal);
  }

  const listenForChanges = (id) => {
    const unsubscribe = onSnapshot(doc(db.appPayments, id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (!data) {
          return;
        }
        entity.value = { ...data, id: doc.id };
      }
    });

    onUnmounted(() => {
      unsubscribe();
    });
  };

  const createPayment = (price: number) => {
    const id = `${randomXToY(CODE_RANGE[0], CODE_RANGE[1])}`;

    const appPayment: AppPayment = {
      id,
      created: Date.now(),
      kind: "KASSELI",
      amount: price,
      status: "open",
    };

    setDoc(doc(db.appPayments, appPayment.id), appPayment);

    return id;
  };

  const setStatus = (id: string, status: AppPaymentStatus) => {
    updateDoc(doc(db.appPayments, id), { status: status });
  };

  return {
    entity,
    createPayment,
    setStatus,
    error,
    listenForChanges,
  };
}
