import { ref } from "vue";
import firebase from "../firebaseInit";
const db = firebase.firestore();

export default function(path) {
  const entity = ref(null);

  db.doc(path)
    .get()
    .then((doc) => {
      entity.value = { id: doc.id, data: doc.data() };
    })
    .catch((e) => console.log(e));

  return { entity };
}
