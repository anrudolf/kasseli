import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";

import firebase from "../firebaseInit";

import utils from "../utils";
import { useDebounce } from "../hooks/use-debounce";

const db = firebase.firestore();

export default function({ editing = false, initialId = null }) {
  const router = useRouter();

  const entity = reactive({
    id: null,
    label: {
      de: null,
      en: null,
    },
    price: null,
    template: false,
    created: null,
    image: null,
    imageRef: null,
  });

  let unmaskedId = "";

  if (initialId) {
    db.collection("products")
      .doc(initialId)
      .get()
      .then((doc) => {
        // TODO: use document from Vuex store to make it faster in offline mode
        if (doc.exists) {
          const data = doc.data();
          if (!data) {
            return;
          }
          Object.assign(entity, { ...entity, ...data, id: doc.id });
        }
      });
  }

  const exists = ref(false);
  const loading = ref(false);

  const { id, template } = toRefs(entity);

  const save = () => {
    if (!initialId) {
      entity.created = Date.now();
    }

    if (entity.template) {
      entity.price = null;
    }

    db.collection("products")
      .doc(entity.id)
      .set(entity);
    router.push("/products");
  };

  const remove = () => {
    db.collection("products")
      .doc(entity.id)
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

    if (!entity.id) {
      return true;
    }

    if (!entity.label.de) {
      return true;
    }

    if (!entity.template && typeof entity.price !== "number") {
      return true;
    }

    return false;
  });

  const templateEnabled = computed(() => {
    // allow switching templates on-off when creating a new product
    if (!editing && utils.isTemplate(entity.id)) {
      return true;
    }

    return utils.isTemplateConform(entity.id);
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
        if (doc.exists) {
          exists.value = true;
        } else {
          exists.value = false;
        }
      })
      .catch((e) => {
        exists.value = false;
        console.error(e);
      });
  }, 300);

  const idDisabled = computed(() => editing || entity.template);

  watch(id, (v) => {
    onIdChangedHandler(v);
  });

  watch(template, (v, old) => {
    if (v && !old) {
      unmaskedId = entity.id;
      entity.id = utils.createTemplate(entity.id);
    } else {
      entity.id = unmaskedId;
    }
  });

  return {
    entity,
    exists,
    remove,
    save,
    saveDisabled,
    idDisabled,
    templateEnabled,
  };
}
