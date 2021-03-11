import { ref, reactive, computed, watch, toRef } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import { useDebounce } from "./use-debounce";

const db = firebase.firestore();

const COLLECTION = "widget-groups";
const DEFAULT_RETURN_ROUTE = "/widget-groups";

export default function(initialId = null) {
  const router = useRouter();

  const entity = reactive({
    id: null,
    data: {
      label: {
        de: null,
        en: null,
      },
      image: null,
      imageRef: null,
      content: [],
      hidden: false,
      created: null,
    },
  });

  if (initialId) {
    db.collection(COLLECTION)
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          entity.id = doc.id;

          const {
            label,
            image,
            imageRef,
            content,
            hidden,
            created,
          } = doc.data();
          entity.data.label = label;
          entity.data.image = image;
          entity.data.imageRef = imageRef;
          entity.data.content = content;
          entity.data.hidden = hidden;
          entity.data.created = created;
        }
      });
  }

  const id = toRef(entity, "id");
  const image = toRef(entity.data, "image");

  const save = () => {
    if (!initialId) {
      entity.data.created = Date.now();
    }
    db.collection(COLLECTION)
      .doc(entity.id)
      .set(entity.data)
      .then(() => {
        router.push(DEFAULT_RETURN_ROUTE);
      })
      .catch((error) => console.log(error));
  };

  const remove = () => {
    db.collection(COLLECTION)
      .doc(entity.id)
      .delete()
      .then(() => {
        router.push(DEFAULT_RETURN_ROUTE);
      })
      .catch((error) => console.log(error));
  };

  const saveDisabled = computed(() => {
    return !entity.id || !entity.data.label.de;
  });

  const exists = ref(false);

  const onIdChangedHandler = useDebounce((v) => {
    if (!v) {
      return;
    }
    db.collection(COLLECTION)
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

  // deprecated
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
        entity.data.image = r.data.url;
      });
    };
  };

  watch(id, (v, old) => {
    onIdChangedHandler(v);
  });

  return {
    id,
    entity,
    exists,
    remove,
    save,
    saveDisabled,
    uploadImage,
  };
}
