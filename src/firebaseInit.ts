import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import config from "./firebaseConfig";

const firebaseConfig = { ...config };

export const initFirestore = () => {
  const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  });

  enableIndexedDbPersistence(db).catch(function (err) {
    if (err.code == "failed-precondition") {
      console.error("firestore: failed-precondition");
    } else if (err.code == "unimplemented") {
      console.error("firestore: unimplemented");
    } else {
      console.error("firestore: unknown", err);
    }
  });
};

// init app
const app = initializeApp(firebaseConfig);

// init firestore
initFirestore();

export default app;
