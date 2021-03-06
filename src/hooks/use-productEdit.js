import { ref, reactive, computed, watch, toRefs, toRef } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import utils from "../utils";
import { useDebounce } from "../hooks/use-debounce";

const db = firebase.firestore();

export default function({ editing = false, initialId = null }) {
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
      image: null,
    },
  });

  if (initialId) {
    db.collection("products")
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          product.id = doc.id;
          //product.data = doc.data(); // reactivity is lost this way

          const {
            label,
            price,
            noBarcode,
            template,
            created,
            image,
          } = doc.data();
          product.data.label = label;
          product.data.price = price;
          product.data.noBarcode = noBarcode;
          product.data.template = template;
          product.data.created = created;
          product.data.image = image;
        }
      });
  }

  const { id: rawProductId } = toRefs(product);
  const exists = ref(false);
  const image = toRef(product.data, "image");
  const loading = ref(false);

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
    if (loading.value) {
      return true;
    }

    if (!editing && exists.value) {
      return true;
    }

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

  const uploadImage = async (file) => {
    loading.value = true;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const createThumbnailFunction = firebase
        .functions("europe-west1")
        .httpsCallable("createThumbnail");

      createThumbnailFunction({
        filename: file.name,
        base64image: reader.result,
        directory: "thumbnails",
      })
        .then((r) => {
          product.data.image = r.data.url;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    reader.onerror = () => {
      loading.value = false;
    };
  };

  watch(image, (v, old) => {
    console.log("image changed", v);
  });

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
