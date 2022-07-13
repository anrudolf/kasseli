"use strict";

//import functions from "firebase-functions";
const functions = require("firebase-functions");

exports.searchMigros = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    return { message: `Searching for ${data.query}` };
  });
