import { ref, reactive, computed, watch, toRef } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import { useDebounce } from "../hooks/use-debounce";

const db = firebase.firestore();

export default function(initialId = null) {
  const router = useRouter();

  const card = reactive({
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
    db.collection("cards")
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          card.id = doc.id;

          const { label, image, content, hidden, created } = doc.data();
          card.data.label = label;
          card.data.image = image;
          card.data.content = content;
          card.data.hidden = hidden;
          card.data.created = created;
        }
      });
  }

  const id = toRef(card, "id");
  const image = toRef(card.data, "image");

  const save = () => {
    if (!initialId) {
      card.data.created = Date.now();
    }
    db.collection("cards")
      .doc(card.id)
      .set(card.data)
      .then(() => {
        console.log("document set, pushing route /cards");
        router.push("/cards");
      })
      .catch((error) => console.log(error));
  };

  const remove = () => {
    db.collection("cards")
      .doc(card.id)
      .delete()
      .then(() => {
        console.log("document set, pushing route /cards");
        router.push("/cards");
      })
      .catch((error) => console.log(error));
  };

  const saveDisabled = computed(() => {
    return !card.id || !card.data.label.de;
  });

  const exists = ref(false);

  const onIdChangedHandler = useDebounce((v) => {
    if (!v) {
      return;
    }
    db.collection("cards")
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
        card.data.image = r.data.url;
      });
    };
  };

  watch(id, (v, old) => {
    onIdChangedHandler(v);
  });

  return {
    id,
    card,
    exists,
    remove,
    save,
    saveDisabled,
    uploadImage,
  };
}
