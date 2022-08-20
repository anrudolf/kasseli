import "pinia";

export interface Label {
  de: string;
  en?: string | null;
}

export interface TillProduct {
  kind: "product";
  id: string;
  hidden: boolean;
}

export interface TillCatalog {
  kind: "catalog";
  id: string;
  label: Label;
  imageRef: string | null;
  hidden: boolean;
  content: Array<{ id: string; kind: string }>;
}

export interface Till {
  id: string;
  label: Label;
  imageRef: string | null;
  created: string;
  favorites: Array<TillCatalog | TillProduct>;
}

export interface ImageRef {
  id: string;
  type: string;
  mediaType: string;
  payload: string;
}
export interface Product {
  id: string;
  label: Label;
  price: number | null;
  template: boolean;
  created: string;
  imageRef: string | null;
}

export type AppPaymentStatus = "open" | "reject" | "pay" | "rejected" | "paid";

export interface AppPayment {
  id: string;
  created: string;
  kind: string;
  amount: number;
  status: AppPaymentStatus;
}

export interface Workspace {
  id: string;
  creator: string;
  name: string;
  created: string;
  archived: boolean;
}

export enum WorkspaceRole {
  None = 0,
  User = 1,
  Admin = 2,
  Owner = 3,
  Creator = 4,
}

export interface WorkspaceMember {
  uid: string;
  role: WorkspaceRole;
  created: string;
  invite: string;
}

export enum WorkspaceInviteUsage {
  SINGLE = "single",
  MULTI = "multi",
}

export interface WorkspaceInvite {
  id: string;
  workspace: string;
  role: WorkspaceRole;
  creator: string;
  created: string;
  usage: WorkspaceInviteUsage;
}

export interface ReceiptItem {
  code: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  created: string;
  content: Array<ReceiptItem>;
  price: number;
}

export interface OrderItem {
  code: string;
  product: Product;
  quantity: number;
  price: number;
}

export enum OrdertStatus {
  CANCELED = -1,
  NEW,
  IN_PREPARATION,
  READY_TO_SHIP,
  OUT_FOR_DELIVERY,
  DELIVERED,
}

export enum OrderTabStatus {
  CANCELED = -1,
  OPEN,
  COMPLETED,
}

export interface Order {
  id: string;
  workspace: string;
  serial: string;
  reference: string;
  created: string;
  updated: string;
  status: OrdertStatus;
  paid: boolean;
  price: number;
  content: Array<OrderItem>;
}

export interface OrderTab {
  id: string;
  workspace: string;
  serial: string;
  reference: string;
  created: string;
  updated: string;
  status: OrderTabStatus;
  paid: boolean;
  price: number;
}

export interface OrderReference {
  id: string;
  hidden: boolean;
  name: string;
}

export interface CloudSearchResponse {
  status: number;
  hasResults: boolean;
  query: string;
  content: {
    label: string;
    price: number;
  } | null;
}
