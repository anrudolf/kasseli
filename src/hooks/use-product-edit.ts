import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

import utils from "../utils";
import { useDebounce } from "../hooks/use-debounce";

import db from "@/utils/db";

import { Product } from "@/types";

export default function ({ editing = false, id = "" }) {
  const router = useRouter();

  const entity: Product = reactive({
    id: "",
    label: {
      de: "",
      en: null,
    },
    price: 0,
    template: false,
    created: new Date().toISOString(),
    imageRef: null,
  });

  let unmaskedId = "";

  if (id) {
    entity.id = id;
    getDoc(doc(db.products, id)).then((doc) => {
      // TODO: use document from Vuex store to make it faster in offline mode
      if (doc.exists()) {
        const data = doc.data();
        if (!data) {
          return;
        }

        if (!editing) {
          exists.value = true;
          return;
        }

        Object.assign(entity, { ...entity, ...data, id: doc.id });
      }
    });
  }

  const exists = ref(false);
  const loading = ref(false);

  const { id: watchedId, template } = toRefs(entity);

  const save = () => {
    if (!editing) {
      entity.created = new Date().toISOString();
    }

    if (entity.template) {
      entity.price = null;
    }

    setDoc(doc(db.products, entity.id), entity);
    router.push("/products");
  };

  const remove = () => {
    deleteDoc(doc(db.products, entity.id));
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

    getDoc(doc(db.products, v))
      .then((doc) => {
        if (doc.exists()) {
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

  watch(watchedId, (v) => {
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

  const createExample = ({ id }: { id: string }): Product => {
    return {
      id: id,
      label: {
        de: "Beispiel Produkt",
        en: null,
      },
      price: 1.0,
      template: false,
      created: new Date().toISOString(),
      imageRef: null,
    };
  };

  return {
    entity,
    exists,
    remove,
    save,
    saveDisabled,
    idDisabled,
    templateEnabled,
    // special functions
    createExample,
  };
}
