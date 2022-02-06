import {
  CollectionReference,
  QuerySnapshot,
  onSnapshot,
  FirestoreError,
} from "firebase/firestore";

import { onUnmounted } from "vue";

const useCollection = <T>(
  collection: CollectionReference<T>,
  successCallback = (snapshot: QuerySnapshot<T>) => {
    console.log("new snapshot", snapshot);
  },
  errorCallback = (err: FirestoreError) => {
    console.error(err);
  }
) => {
  const unsubscribe = onSnapshot(collection, successCallback, errorCallback);

  onUnmounted(() => {
    unsubscribe();
  });
};

export default useCollection;
