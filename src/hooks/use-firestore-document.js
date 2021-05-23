import { ref } from "vue";
import firebase from "../firebaseInit";
const db = firebase.firestore();

const fetch = async (path, options, entity) => {
  let snapshot;

  try {
    snapshot = await db.doc(path).get(options);
  } catch (e) {
    snapshot = await db.doc(path).get();
  }

  entity.value = { id: snapshot.id, data: snapshot.data() };
};

export default function(path, options = { source: "default" }) {
  const entity = ref(null);

  fetch(path, options, entity);

  return entity;
}
