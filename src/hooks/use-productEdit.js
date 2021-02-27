import { ref, reactive, computed, watch, toRefs, toRef } from "vue";
import { useRouter } from "vue-router";
import blobToHash from "blob-to-hash";
import { v5 as uuidv5 } from "uuid";

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
  const image = toRef(product.data, "image");
  const imageDownloadUrl = ref("");

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

  const uploadImage = async (file) => {
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

  const uploadImage2 = async (file) => {
    const reader = new FileReader();
    //reads the binary data and encodes it as base64 data url
    reader.readAsDataURL(file);
    //reads it finish with either success or failure
    reader.onloadend = () => {
      //reader.result is the result of the reading in base64 string

      const createThumbnailFunction = firebase
        .functions("europe-west1")
        .httpsCallable("createThumbnail");

      createThumbnailFunction({ name: file.name }).then((r) => console.log(r));
    };
  };

  watch(image, (v, old) => {
    console.log("image changed", v);

    if (v) {
      const root = firebase.storage().ref();
      const storageRef = root.child(v);
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
        imageDownloadUrl.value = url;
      });
    } else {
      imageDownloadUrl.value = "";
    }
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
    uploadImage2,
    imageDownloadUrl,
  };
}
