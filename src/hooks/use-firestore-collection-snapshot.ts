import firebase from "firebase/app";

import { onUnmounted } from "vue";

const useCollection = <T>(
  collection: firebase.firestore.CollectionReference<T>,
  callback = (snapshot: firebase.firestore.QuerySnapshot<T>) => {
    console.log("new snapshot", snapshot);
  }
) => {
  const unsubscribe = collection.onSnapshot(callback);

  onUnmounted(() => {
    unsubscribe();
  });
};

export default useCollection;
