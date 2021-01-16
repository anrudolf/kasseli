import { reactive, computed, watch, toRef, toRefs } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import utils from "../utils";

const db = firebase.firestore();

export default function() {
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
    },
  });

  const { id: rawProductId } = toRefs(product);
  const productId = computed(() => {
    if (product.data.template) {
      return utils.createTemplate(rawProductId.value);
    }

    return rawProductId.value;
  });

  const save = () => {
    db.collection("products")
      .doc(product.id)
      .set(product.data)
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

  watch(product, (p) => {
    if (!p.id || p.id.length < 13 || p.data.noBarcode) {
      product.data.template = false;
    }
  });

  watch(productId, (v, old) => {
    if (v && v !== old) {
      db.collection("products")
        .doc(v)
        .get()
        .then((doc) => {
          if (doc.exists) {
            product.id = doc.id;
            product.data = doc.data();
          }
        });
    }
  });

  return { productId, product, save, saveDisabled, templateEnabled };
}
