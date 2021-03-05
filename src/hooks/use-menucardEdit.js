import { ref, reactive, computed, watch, toRef } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import { useDebounce } from "../hooks/use-debounce";

const db = firebase.firestore();

export default function(initialId = null) {
  const router = useRouter();

  const menucard = reactive({
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
    db.collection("menucards")
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          menucard.id = doc.id;

          const { label, image, content, hidden, created } = doc.data();
          menucard.data.label = label;
          menucard.data.image = image;
          menucard.data.content = content;
          menucard.data.hidden = hidden;
          menucard.data.created = created;
        }
      });
  }

  const id = toRef(menucard, "id");
  const image = toRef(menucard.data, "image");

  const save = () => {
    if (!initialId) {
      menucard.data.created = Date.now();
    }
    db.collection("menucards")
      .doc(menucard.id)
      .set(menucard.data)
      .then(() => {
        console.log("document set, pushing route /menucards");
        router.push("/menucards");
      })
      .catch((error) => console.log(error));
  };

  const remove = () => {
    db.collection("menucards")
      .doc(menucard.id)
      .delete()
      .then(() => {
        console.log("document set, pushing route /menucards");
        router.push("/menucards");
      })
      .catch((error) => console.log(error));
  };

  const saveDisabled = computed(() => {
    return !menucard.id || !menucard.data.label.de;
  });

  const exists = ref(false);

  const onIdChangedHandler = useDebounce((v) => {
    if (!v) {
      return;
    }
    db.collection("menucards")
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
        menucard.data.image = r.data.url;
      });
    };
  };

  watch(id, (v, old) => {
    onIdChangedHandler(v);
  });

  return {
    id,
    menucard,
    exists,
    remove,
    save,
    saveDisabled,
    uploadImage,
  };
}
