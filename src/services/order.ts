import db from "@/services/db";

import {
  setDoc,
  doc,
  limit,
  query,
  where,
  getDocs,
  orderBy,
  runTransaction,
  getFirestore,
  writeBatch,
  updateDoc,
} from "firebase/firestore";

import useKasse from "@/store/kasse";
import { Order, OrderStatus, OrderItem } from "@/types";

export const createSerial = async () => {
  try {
    const ordersSerialDocRef = doc(db.serials, "orders");

    const newOrdersSerial = await runTransaction(
      getFirestore(),
      async (transaction) => {
        const ordersSerialDoc = await transaction.get(ordersSerialDocRef);
        if (!ordersSerialDoc.exists()) {
          const defaultOrdersSerial = {
            id: "orders",
            prefix: "",
            suffix: "",
            sequence: 1,
          };
          transaction.set(ordersSerialDocRef, defaultOrdersSerial);
          return `${defaultOrdersSerial.prefix}${defaultOrdersSerial.sequence}${defaultOrdersSerial.suffix}`;
        }

        const { prefix, suffix, sequence } = ordersSerialDoc.data();
        const newSequence = sequence + 1;
        transaction.update(ordersSerialDocRef, { sequence: newSequence });
        return `${prefix}${newSequence}${suffix}`;
      }
    );

    console.log("New orders serial:", newOrdersSerial);
    return newOrdersSerial;
  } catch (e) {
    console.error(e);
    return "???";
  }
};

export const createOrder = async (serial: string) => {
  const kasse = useKasse();

  const docRef = doc(db.orders);

  const now = new Date().toISOString();

  const order: Order = {
    id: docRef.id,
    status: OrderStatus.NEW,
    serial: serial,
    reference: "",
    created: now,
    updated: now,
    note: "",
    content: {},
  };

  let n = 0;

  kasse.items.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      const orderItem: OrderItem = {
        id: n,
        status: OrderStatus.NEW,
        paid: false,
        price: item.price,
        code: item.code,
        product: item.product,
        note: "",
      };
      order.content[n] = orderItem;
      n = n + 1;
    }
  });

  setDoc(docRef, order);

  return order;
};

export const setOrderItemStatus = (
  id: string,
  items: number | number[],
  status: OrderStatus
) => {
  const now = new Date().toISOString();
  const orderDocRef = doc(db.orders, id);
  const update = { updated: now };

  if (Array.isArray(items)) {
    items.forEach((item) => {
      update[`content.${item}.status`] = status;
    });
  } else {
    update[`content.${items}.status`] = status;
  }

  updateDoc(orderDocRef, update);
};
