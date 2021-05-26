import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";

import { useDebounce } from "../hooks/use-debounce";

import { Till } from "@/types";

import { db } from "../utils/db";

const DEFAULT_RETURN_ROUTE = "/tills";

export default function({ editing = false, initialId = undefined }) {
  const router = useRouter();

  const entity: Till = reactive({
    id: "",
    label: {
      de: null,
      en: null,
    },
    imageRef: null,
    created: Date.now(),
    cards: [],
  });

  const { id } = toRefs(entity);

  if (initialId) {
    db.tills
      .doc(initialId)
      .get()
      .then((doc) => {
        if (doc.exists) {
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
      entity.created = Date.now();
    }

    db.tills.doc(entity.id).set(entity);
    router.push(DEFAULT_RETURN_ROUTE);
  };

  const remove = () => {
    db.tills.doc(entity.id).delete();
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

    if (!entity.label.de) {
      return true;
    }

    return false;
  });

  const onIdChangedHandler = useDebounce((v) => {
    exists.value = false;
    if (!v) {
      return;
    }

    db.tills
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
  };
}
