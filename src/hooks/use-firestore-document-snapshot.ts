import {
  onSnapshot,
  DocumentReference,
  DocumentSnapshot,
} from "firebase/firestore";

import { onUnmounted } from "vue";

const useCollection = <T>(
  document: DocumentReference<T>,
  callback = (snapshot: DocumentSnapshot<T>) => {
    console.log("new snapshot", snapshot);
  }
) => {
  const unsubscribe = onSnapshot(document, callback);

  onUnmounted(() => {
    unsubscribe();
  });
};

export default useCollection;
