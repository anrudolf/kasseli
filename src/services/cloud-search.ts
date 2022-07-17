import { getApp } from "firebase/app";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { CloudSearchResponse } from "@/types";

const functions = getFunctions(getApp(), "europe-west1");

if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// Search GTIN on
// https://gepir.gs1.org/index.php/search-by-gln
// to find prefixes
const GS1_PREFIXES = [
  {
    value: 7610200,
    company: "Migros",
  },
];

const searchMigros = httpsCallable(functions, "searchMigros");

const search = async (query: string): Promise<CloudSearchResponse> => {
  try {
    const r = await searchMigros({ query: query });
    return r.data as CloudSearchResponse;
  } catch (error) {
    return { status: 500, query, hasResults: false, content: null };
  }
};

export default {
  search,
  GS1_PREFIXES,
};
