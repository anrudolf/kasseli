import { Product, Till, TillProduct, TillCatalog } from "@/types";

export const createSampleProduct = ({ id }: { id: string }): Product => {
  return {
    id: id,
    label: {
      de: "Beispiel Produkt",
      en: null,
    },
    price: 1.0,
    template: false,
    created: new Date().toISOString(),
    imageRef: null,
  };
};

export const createSampleTill = ({
  id,
  favorites = [],
}: {
  id: string;
  favorites?: (TillProduct | TillCatalog)[];
}): Till => {
  return {
    id: id,
    label: {
      de: "Beispiel Kasse",
      en: null,
    },
    imageRef: null,
    created: new Date().toISOString(),
    favorites: favorites,
  };
};
