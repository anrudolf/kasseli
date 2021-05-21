interface Label {
  de: string | null;
  en?: string | null;
}

interface TillCard {
  label: Label;
  imageRef: string | null;
  hidden: boolean;
  content: Array<{ id: string; type: string }>;
}

interface Till {
  id: string;
  label: Label;
  imageRef: string | null;
  created: number;
  cards: Array<TillCard>;
}

interface ImageRef {
  id: string;
  type: string;
  mediaType: string;
  payload: string;
}
