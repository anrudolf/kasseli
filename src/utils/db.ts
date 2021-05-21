import firebase from "firebase/app";

import instance from "../firebaseInit";

const fs = instance.firestore();

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});
const dataPoint = <T>(collectionPath: string) =>
  fs.collection(collectionPath).withConverter(converter<T>());
const db = {
  // list your collections here
  // users: dataPoint<YourType>('users')
  tills: dataPoint<Till>("tills"),
  images: dataPoint<ImageRef>("images"),
};
export { db };
export default db;
