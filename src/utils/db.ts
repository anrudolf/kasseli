import {
  getFirestore,
  QueryDocumentSnapshot,
  collection,
  WithFieldValue,
} from "firebase/firestore";

import workspace from "@/utils/workspace";

console.log("db: workspace");
console.log(workspace);

import {
  Till,
  ImageRef,
  Product,
  AppPayment,
  Workspace,
  WorkspaceMember,
} from "@/types";

const fs = getFirestore();

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  collection(fs, collectionPath).withConverter(converter<T>());

const db = {
  tills: dataPoint<Till>(`${workspace}tills`),
  images: dataPoint<ImageRef>(`${workspace}images`),
  products: dataPoint<Product>(`${workspace}products`),
  appPayments: dataPoint<AppPayment>("appPayments"),
  workspaces: dataPoint<Workspace>("workspaces"),
  workspaceMembers: (wid: string) =>
    dataPoint<WorkspaceMember>(`workspaces/${wid}/members`),
};

export default db;
