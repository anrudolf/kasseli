import {
  collectionGroup,
  getDocs,
  query,
  where,
  getFirestore,
  getDoc,
  doc,
  collection,
  updateDoc,
  deleteField,
} from "firebase/firestore";

export const refactorProducts = async () => {
  const snaps = await getDocs(collection(getFirestore(), "products"));
  const products = snaps.docs;
  products.forEach(async (snap) => {
    const data = snap.data();
    const r = doc(getFirestore(), snap.ref.path);

    console.log(snap.id);
    // set id field
    if (!data.id) {
      console.log(`updating ${r.path}: setting id to ${snap.id}`);
      await updateDoc(r, { id: snap.id });
    }

    // refactor created field to ISO string
    if (typeof data.created == "number") {
      const iso = new Date(data.created).toISOString();
      console.log(`updating ${r.path}: setting created to ${iso}`);
      await updateDoc(r, { created: iso });
    }

    // removing image field (in favor of imageRef)
    if ("image" in data) {
      console.log("  deleting image field");
      await updateDoc(r, { image: deleteField() });
    }

    // removing noBarcode field (in favor of template)
    if ("noBarcode" in data) {
      console.log("  deleting noBarcode field");
      await updateDoc(r, { noBarcode: deleteField() });
    }
  });
};

export const refactorTills = async () => {
  const snaps = await getDocs(collection(getFirestore(), "tills"));
  const tills = snaps.docs;
  tills.forEach(async (snap) => {
    const data = snap.data();
    const r = doc(getFirestore(), snap.ref.path);

    console.log(snap.id);

    // refactor created field to ISO string
    if (typeof data.created == "number") {
      const iso = new Date(data.created).toISOString();
      console.log(`  updating ${r.path}: setting created to ${iso}`);
      const res = await updateDoc(r, { created: iso });
      console.log(res);
    }
  });
};

export const refactorAppPayments = async () => {
  const snaps = await getDocs(collection(getFirestore(), "appPayments"));
  const appPayments = snaps.docs;
  appPayments.forEach(async (snap) => {
    const data = snap.data();
    const r = doc(getFirestore(), snap.ref.path);

    console.log(snap.id);

    // refactor created field to ISO string
    if (typeof data.created == "number") {
      const iso = new Date(data.created).toISOString();
      console.log(`  updating ${r.path}: setting created to ${iso}`);
      const res = await updateDoc(r, { created: iso });
    }
  });
};

export default { refactorProducts, refactorTills, refactorAppPayments };
