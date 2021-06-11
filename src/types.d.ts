import "pinia";

export interface Label {
  de: string;
  en?: string | null;
}

export interface TillCatalog {
  label: Label;
  imageRef: string | null;
  hidden: boolean;
  content: Array<{ id: string; type: string }>;
}

export interface Till {
  id: string;
  label: Label;
  imageRef: string | null;
  created: number;
  catalogs: Array<TillCatalog>;
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
