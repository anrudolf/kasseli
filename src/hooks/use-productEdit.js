import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import utils from "../utils";
import { useDebounce } from "../hooks/use-debounce";

const db = firebase.firestore();

export default function(initialId = null) {
  const router = useRouter();

  const product = reactive({
    id: null,
    data: {
      label: {
        de: null,
        en: null,
      },
      price: null,
      noBarcode: false,
      template: false,
      created: null,
    },
  });

  if (initialId) {
    db.collection("products")
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          product.id = doc.id;
          product.data = doc.data();
        }
      });
  }

  const { id: rawProductId } = toRefs(product);
  const id = computed(() => {
    if (product.data.template) {
      return utils.createTemplate(rawProductId.value);
    }

    return rawProductId.value;
  });

  const save = () => {
    if (!initialId) {
      product.data.created = Date.now();
    }
    db.collection("products")
      .doc(id.value)
      .set(product.data)
      .then(() => {
        console.log("document set, pushing route /products");
        router.push("/products");
      })
      .catch((error) => console.log(error));
  };

  const remove = () => {
    db.collection("products")
      .doc(id.value)
      .delete()
      .then(() => {
        console.log("document set, pushing route /products");
        router.push("/products");
      })
      .catch((error) => console.log(error));
  };

  const saveDisabled = computed(() => {
    return (
      !product.id ||
      !product.data.label.de ||
      typeof product.data.price !== "number"
    );
  });

  const templateEnabled = computed(() => {
    return (
      !product.data.noBarcode &&
      product.id &&
      utils.isNumeric(product.id) &&
      product.id.length === 13
    );
  });

  const exists = ref(false);

  watch(product, (p) => {
    if (!p.id || p.id.length < 13 || p.data.noBarcode) {
      product.data.template = false;
    }
  });

  const onIdChangedHandler = useDebounce((v) => {
    if (!v) {
      return;
    }
    db.collection("products")
      .doc(v)
      .get()
      .then((doc) => {
        if (doc.exists) {
          exists.value = true;
        } else {
          exists.value = false;
        }
      });
  }, 700);

  const uploadImage = (file) => {
    console.log(file);
    const root = firebase.storage().ref();
    const ref = root.child(`${id.value}.jpeg`);
    ref.put(file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  watch(id, (v, old) => {
    onIdChangedHandler(v);
  });

  return {
    id,
    product,
    exists,
    remove,
    save,
    saveDisabled,
    templateEnabled,
    uploadImage,
  };
}
