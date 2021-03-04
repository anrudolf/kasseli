import { ref, reactive, computed, watch, toRef } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import { useDebounce } from "../hooks/use-debounce";

const db = firebase.firestore();

export default function(initialId = null) {
  const router = useRouter();

  const bundle = reactive({
    id: null,
    data: {
      label: {
        de: null,
        en: null,
      },
      image: null,
      content: [],
      hidden: false,
    },
  });

  if (initialId) {
    db.collection("bundles")
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          bundle.id = doc.id;

          const { label, image, content, hidden, created } = doc.data();
          bundle.data.label = label;
          bundle.data.image = image;
          bundle.data.content = content;
          bundle.data.hidden = hidden;
          bundle.data.created = created;
        }
      });
  }

  const id = toRef(bundle, "id");
  const image = toRef(bundle.data, "image");

  const save = () => {
    if (!initialId) {
      bundle.data.created = Date.now();
    }
    db.collection("bundles")
      .doc(bundle.id)
      .set(bundle.data)
      .then(() => {
        console.log("document set, pushing route /bundles");
        router.push("/bundles");
      })
      .catch((error) => console.log(error));
  };

  const remove = () => {
    db.collection("bundles")
      .doc(bundle.id)
      .delete()
      .then(() => {
        console.log("document set, pushing route /bundles");
        router.push("/bundles");
      })
      .catch((error) => console.log(error));
  };

  const saveDisabled = computed(() => {
    return !bundle.id || !bundle.data.label.de;
  });

  const exists = ref(false);

  const onIdChangedHandler = useDebounce((v) => {
    if (!v) {
      return;
    }
    db.collection("bundles")
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const createThumbnailFunction = firebase
        .functions("europe-west1")
        .httpsCallable("createThumbnail");

      createThumbnailFunction({
        filename: file.name,
        base64image: reader.result,
        directory: "thumbnails",
      }).then((r) => {
        bundle.data.image = r.data.url;
      });
    };
  };

  watch(id, (v, old) => {
    onIdChangedHandler(v);
  });

  return {
    id,
    bundle,
    exists,
    remove,
    save,
    saveDisabled,
    uploadImage,
  };
}
