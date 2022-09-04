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
} from "firebase/firestore";

import useKasse from "@/store/kasse";
import { Order, OrderStatus } from "@/types";

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

export const createOrders = async (serial: string) => {
  const kasse = useKasse();

  const orders: Order[] = [];

  const now = new Date().toISOString();

  const batch = writeBatch(db.orders.firestore);

  kasse.items.forEach((item) => {
    const order: Order = {
      id: doc(db.orders).id,
      serial: serial,
      reference: "",
      created: now,
      updated: now,
      status: OrderStatus.NEW,
      paid: false,
      price: item.price,
      code: item.code,
      product: item.product,
      note: "",
    };
    orders.push(order);
  });

  orders.forEach((order) => {
    const orderDocRef = doc(db.orders, order.id);
    batch.set(orderDocRef, order);
  });

  await batch.commit();
};
