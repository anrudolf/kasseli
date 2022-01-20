import {
  CollectionReference,
  QuerySnapshot,
  onSnapshot,
} from "firebase/firestore";

import { onUnmounted } from "vue";

const useCollection = <T>(
  collection: CollectionReference<T>,
  callback = (snapshot: QuerySnapshot<T>) => {
    console.log("new snapshot", snapshot);
  }
) => {
  const unsubscribe = onSnapshot(collection, callback);

  onUnmounted(() => {
    unsubscribe();
  });
};

export default useCollection;
