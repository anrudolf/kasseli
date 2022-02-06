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

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  collection(getFirestore(), collectionPath).withConverter(converter<T>());

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

export const initWorkspace = (ws: string) => {
  const prefix = createWorkspacePrefix(ws);
  // update workspace specific collections
  db.tills = dataPoint<Till>(`${prefix}tills`);
  db.images = dataPoint<ImageRef>(`${prefix}images`);
  db.products = dataPoint<Product>(`${prefix}products`);

  // also re-initialize non-workspace specific collections
  db.appPayments = dataPoint<AppPayment>("appPayments");
  db.workspaces = dataPoint<Workspace>("workspaces");
  db.workspaceMembers = (wid: string) =>
    dataPoint<WorkspaceMember>(`workspaces/${wid}/members`);
  db.workspaceInvites = (wid: string) =>
    dataPoint<WorkspaceInvite>(`workspaces/${wid}/invites`);
};

export default db;
