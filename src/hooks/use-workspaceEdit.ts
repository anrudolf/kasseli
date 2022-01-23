import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

import { useDebounce } from "../hooks/use-debounce";

import { Workspace } from "@/types";

import db from "@/utils/db";

const DEFAULT_RETURN_ROUTE = "/workspaces";

export default function ({ editing = false, initialId = undefined }) {
  const router = useRouter();

  const entity: Workspace = reactive({
    id: "",
    owner: "",
    name: "",
    created: new Date().toISOString(),
    archived: false,
  });

  const { id } = toRefs(entity);

  if (initialId) {
    getDoc(doc(db.workspaces, initialId)).then((doc) => {
      if (doc.exists()) {
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

  const save = () => {
    if (!initialId) {
      entity.created = new Date().toISOString();
    }

    setDoc(doc(db.workspaces, entity.id), entity);
    router.push(DEFAULT_RETURN_ROUTE);
  };

  const remove = () => {
    deleteDoc(doc(db.workspaces, entity.id));
    router.push(DEFAULT_RETURN_ROUTE);
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

    if (!entity.name) {
      return true;
    }

    return false;
  });

  const addInvite = () => {
    return 0;
  };

  const onIdChangedHandler = useDebounce((v) => {
    exists.value = false;
    if (!v) {
      return;
    }

    getDoc(doc(db.workspaces, v))
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

  return {
    id,
    entity,
    exists,
    saveDisabled,
    idDisabled,
    remove,
    save,
    // special functions
    addInvite,
  };
}
