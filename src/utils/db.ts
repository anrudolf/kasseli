import {
  getFirestore,
  QueryDocumentSnapshot,
  collection,
  WithFieldValue,
} from "firebase/firestore";

import { createWorkspacePrefix } from "@/utils/workspace";

import {
  Till,
  ImageRef,
  Product,
  AppPayment,
  Workspace,
  WorkspaceMember,
  WorkspaceInvite,
} from "@/types";

const fs = getFirestore();

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  collection(fs, collectionPath).withConverter(converter<T>());

const db = {
  tills: dataPoint<Till>("tills"),
  images: dataPoint<ImageRef>("images"),
  products: dataPoint<Product>("products"),
  appPayments: dataPoint<AppPayment>("appPayments"),
  workspaces: dataPoint<Workspace>("workspaces"),
  workspaceMembers: (wid: string) =>
    dataPoint<WorkspaceMember>(`workspaces/${wid}/members`),
  workspaceInvites: (wid: string) =>
    dataPoint<WorkspaceInvite>(`workspaces/${wid}/invites`),
};

export const initWorkspace = (ws) => {
  const prefix = createWorkspacePrefix(ws);
  // update workspace specific collections
  db.tills = dataPoint<Till>(`${prefix}tills`);
  db.images = dataPoint<ImageRef>(`${prefix}images`);
  db.products = dataPoint<Product>(`${prefix}products`);
};

export default db;
