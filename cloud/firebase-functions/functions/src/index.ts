import * as functions from "firebase-functions";

import axios from "axios";

import { CloudSearchResponse } from "../../../../src/types";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

("use strict");

type MigrosAutocompleteResponse = {
  suggestions: Array<any>;
  categories: Array<any>;
  fullProducts: Array<{ id: number }>;
  content: Array<any>;
  moreProductsToShow: boolean;
};

type MigrosProductCard = {
  id: number;
  brand: string;
  name: string;
  price: {
    displayUnitPrice: boolean;
    multiplier: number;
    value: number;
    unitPrice: {
      value: number;
      unit: string;
    };
  };
};

type MigrosProductCardsResponse = Array<MigrosProductCard>;

exports.searchMigros = functions
  .region("europe-west1")
  .https.onCall(async (data) => {
    const { query } = data;

    const { data: autocompleteResponse, status: autocompleteStatus } =
      await axios.get<MigrosAutocompleteResponse>(
        `https://www.migros.ch/onesearch-oc-autapi/public/v2/autocomplete/languages/DE/regions/national/suggestions/${query}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "de",
          },
        }
      );

    if (
      autocompleteStatus != 200 ||
      autocompleteResponse.fullProducts.length == 0
    ) {
      const rc: CloudSearchResponse = {
        status: autocompleteStatus,
        hasResults: false,
        query,
        content: null,
      };
      return rc;
    }

    const { data: productCardsResponse, status: productCardsStatus } =
      await axios.get<MigrosProductCardsResponse>(
        `https://www.migros.ch/product-display/public/v1/product-cards?uids=${autocompleteResponse.fullProducts[0].id}&storeType=ONLINE&warehouseId=1`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "de",
          },
        }
      );

    if (productCardsStatus != 200 || productCardsResponse.length == 0) {
      const rc: CloudSearchResponse = {
        status: productCardsStatus,
        hasResults: false,
        query,
        content: null,
      };
      return rc;
    }

    const rc: CloudSearchResponse = {
      status: productCardsStatus,
      hasResults: true,
      query,
      content: {
        label: `${productCardsResponse[0].brand} ${productCardsResponse[0].name}`,
        price: productCardsResponse[0].price.value,
      },
    };

    return rc;
  });
