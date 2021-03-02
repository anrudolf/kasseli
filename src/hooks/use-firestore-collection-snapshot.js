import firebase from "../firebaseInit";
const db = firebase.firestore();

export default function(
  collection,
  callback = (snapshot) => {
    console.log("new snapshot", snapshot);
  }
) {
  if (!collection) {
    console.error("no collection specified");
    return;
  }

  db.collection(collection).onSnapshot(callback);
}
