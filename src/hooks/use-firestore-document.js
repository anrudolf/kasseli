import { ref } from "vue";
import {
  getFirestore,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  doc,
} from "firebase/firestore";

const db = getFirestore();

const fetch = async (path, options, entity) => {
  let snapshot;

  if (options.source === "cache") {
    try {
      snapshot = await getDocFromCache(doc(db, path));
    } catch (e) {
      snapshot = await getDoc(doc(db, path));
    }
  } else {
    snapshot = await getDoc(doc(db, path));
  }

  entity.value = { ...snapshot.data(), id: snapshot.id };
};

export default function (path, options = { source: "default" }) {
  const entity = ref(null);

  fetch(path, options, entity);

  return entity;
}
