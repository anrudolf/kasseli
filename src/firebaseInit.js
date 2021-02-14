import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";
import config from "./firebaseConfig";

const firebaseConfig = { ...config };

const instance = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      console.error("firestore: failed-precondition");
    } else if (err.code == "unimplemented") {
      console.error("firestore: unimplemented");
    }
  });

// Initialize Firebase
export default instance;
