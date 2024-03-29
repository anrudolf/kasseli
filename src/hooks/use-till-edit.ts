import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

import { useDebounce } from "../hooks/use-debounce";

import { Till, TillCatalog, TillClipboard, TillProduct } from "@/types";

import db from "@/services/db";

export default function ({
  editing = false,
  id = "",
  clipboard = null as TillClipboard | null,
}) {
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

  if (clipboard) {
    const {
      product,
      favorite: { idx, kind },
    } = clipboard;

    Object.assign(entity, { ...clipboard.till });

    if (product) {
      if (kind == "catalog") {
        const c = entity.favorites[idx] as TillCatalog;
        c.content.push({ id: product.id, kind: "product" });
      } else if (kind == "product") {
        const c = entity.favorites[idx] as TillProduct;
        c.id = product.id;
      }
    }
  } else if (id) {
    entity.id = id;
    getDoc(doc(db.tills, id)).then((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (!data) {
          return;
        }

        if (!editing) {
          exists.value = true;
          return;
        }

        Object.assign(entity, { ...entity, ...data });
      }
    });
  }

  const exists = ref(false);
  const loading = ref(false);

  const { id: watchedId } = toRefs(entity);

  const save = () => {
    if (!editing) {
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

  watch(watchedId, (v) => {
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
