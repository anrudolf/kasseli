import { ref, onUnmounted } from "vue";

import { useRouter } from "vue-router";

import { v4 as uuidv4 } from "uuid";

import { AppPayment, AppPaymentStatus } from "@/types";

import { db } from "../utils/db";

const DEFAULT_RETURN_ROUTE = "/tills";

const STALE_DURATION = 1 * 60 * 1000;
const CODE_RANGE = [1000, 9999];

export default function() {
  const router = useRouter();

  const entity = ref<AppPayment | null>(null);

  function randomXToY(minVal, maxVal) {
    const randVal = minVal + Math.random() * (maxVal - minVal);
    return Math.round(randVal);
  }

  const listenForChanges = (id) => {
    const unsubscribe = db.appPayments.doc(id).onSnapshot((doc) => {
      console.log("updated!");
      console.log(doc.data());
      if (doc.exists) {
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

  const create = () => {
    const id = `${randomXToY(CODE_RANGE[0], CODE_RANGE[1])}`;

    const appPayment: AppPayment = {
      id,
      created: Date.now(),
      kind: "KASSELI",
      amount: 56.1,
      status: "open",
    };

    db.appPayments.doc(appPayment.id).set(appPayment);
    listenForChanges(id);

    return id;
  };

  const setStatus = (id: string, status: AppPaymentStatus) => {
    db.appPayments.doc(id).update({ status: status });
  };

  return {
    entity,
    create,
    setStatus,
  };
}
