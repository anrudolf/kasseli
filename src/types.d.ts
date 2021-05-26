import "pinia";

export interface Label {
  de: string | null;
  en?: string | null;
}

export interface TillCard {
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
  cards: Array<TillCard>;
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
