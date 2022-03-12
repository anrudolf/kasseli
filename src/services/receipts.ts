import db from "@/services/db";

import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import useKasse from "@/store/kasse";

import { Receipt, ReceiptItem } from "@/types";

export const getReceipts = async ({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) => {
  const q = query(
    db.receipts,
    where("created", ">=", from),
    where("created", "<", to),
    orderBy("created", "desc")
  );

  const querySnapshot = await getDocs(q);

  const tmp: Receipt[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    tmp.push(data);
  });

  return tmp;
};

export const createReceipt = () => {
  const kasse = useKasse();

  const content: ReceiptItem[] = [];
  const created = new Date().toISOString();
  let price = 0;

  kasse.items.forEach((item) => {
    content.push(item);
    price += item.price;
  });

  const receiptRef = doc(db.receipts);

  const receipt: Receipt = {
    id: receiptRef.id,
    created,
    price,
    content,
  };

  setDoc(receiptRef, receipt);
};
