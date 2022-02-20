import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

import { useDebounce } from "../hooks/use-debounce";

import { Till, TillCatalog, TillProduct } from "@/types";

import db from "@/utils/db";

export default function ({ editing = false, initialId = undefined }) {
  const router = useRouter();

  const entity: Till = reactive({
    id: "",
    label: {
      de: "",
      en: null,
    },
    imageRef: null,
    created: new Date().toISOString(),
    favorites: [],
  });

  const { id } = toRefs(entity);

  if (initialId) {
    getDoc(doc(db.tills, initialId)).then((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (!data) {
          return;
        }
        Object.assign(entity, { ...entity, ...data });
      }
    });
  }

  const exists = ref(false);
  const loading = ref(false);

  const save = () => {
    if (!initialId) {
      entity.created = new Date().toISOString();
    }

    setDoc(doc(db.tills, entity.id), entity);
    router.go(-1);
  };

  const remove = () => {
    deleteDoc(doc(db.tills, entity.id));
    router.go(-1);
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

    if (entity.favorites.length === 0) {
      return true;
    }

    return false;
  });

  const addCatalog = () => {
    const f: TillCatalog = {
      kind: "catalog",
      id: "",
      label: {
        de: "",
        en: null,
      },
      hidden: false,
      imageRef: null,
      content: [],
    };
    entity.favorites.splice(0, 0, f);
  };

  const addProduct = () => {
    const f: TillProduct = {
      kind: "product",
      id: "",
      hidden: false,
    };
    entity.favorites.splice(0, 0, f);
  };

  const onIdChangedHandler = useDebounce((v) => {
    exists.value = false;
    if (!v) {
      return;
    }

    getDoc(doc(db.tills, v))
      .then((doc) => {
        if (doc.exists()) {
          exists.value = true;
        } else {
          exists.value = false;
        }
      })
      .catch((e) => {
        console.error(e);
        exists.value = false;
      });
  }, 300);

  const idDisabled = computed(() => editing);

  watch(id, (v) => {
    onIdChangedHandler(v);
  });

  const createExample = ({
    id,
    favorites = [],
  }: {
    id: string;
    favorites?: (TillProduct | TillCatalog)[];
  }): Till => {
    return {
      id: id,
      label: {
        de: "Beispiel Kasse",
        en: null,
      },
      imageRef: null,
      created: new Date().toISOString(),
      favorites: favorites,
    };
  };

  return {
    id,
    entity,
    exists,
    saveDisabled,
    idDisabled,
    remove,
    save,
    // special functions
    addCatalog,
    addProduct,
    createExample,
  };
}
