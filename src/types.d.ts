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
  created: number;
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
  created: number | null;
  imageRef: string | null;
}

export type AppPaymentStatus = "open" | "reject" | "pay" | "rejected" | "paid";

export interface AppPayment {
  id: string;
  created: number;
  kind: string;
  amount: number;
  status: AppPaymentStatus;
}
