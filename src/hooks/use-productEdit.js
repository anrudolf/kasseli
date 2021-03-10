import { ref, reactive, computed, watch, toRefs, toRef } from "vue";
import { useRouter } from "vue-router";

import blobToHash from "blob-to-hash";
import { v5 as uuidv5 } from "uuid";

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
      .set(product.data);
    router.push("/products");
  };

  const remove = () => {
    db.collection("products")
      .doc(id.value)
      .delete();
    router.push("/products");
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
    exists.value = false;
    if (!v) {
      return;
    }

    db.collection("products")
      .doc(v)
      .get()
      .then((doc) => {
        console.log(`v=${v}, doc.exists=${doc.exists}`);
        if (doc.exists) {
          exists.value = true;
        } else {
          exists.value = false;
        }
      })
      .catch((e) => {
        exists.value = false;
      });
  }, 300);

  const uploadImageLegacy = async (file) => {
    const lastDot = file.name.lastIndexOf(".");
    const ext = file.name.substring(lastDot + 1);

    const hash = await blobToHash("sha256", file);

    const dir = "productimages";
    const filename = `${hash}.${ext}`;

    const MY_NAMESPACE = "3387eb34-efd7-4f4b-99bb-7f393d790984";

    const token = uuidv5(filename, MY_NAMESPACE);
    console.log("token", token); // this will be used for download url

    const path = `${dir}/${filename}`;
    const thumbPath = `${dir}/thumb_${filename}`;
    product.data.image = thumbPath; // thumbnail will be created through cloud function

    const root = firebase.storage().ref();
    const storageRef = root.child(path);
    storageRef.put(file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  const saveImage = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      //reader.result;
      const options = {
        width: 100,
        height: 100,
        responseType: "base64",
        jpegOptions: { force: true, quality: 90 },
      };
    };

    reader.onerror = () => {
      loading.value = false;
    };
  };

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
    saveImage,
  };
}
