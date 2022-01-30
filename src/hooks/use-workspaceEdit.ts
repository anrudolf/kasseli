import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  runTransaction,
  getFirestore,
} from "firebase/firestore";

import { useDebounce } from "../hooks/use-debounce";

import { Workspace } from "@/types";

import db from "@/utils/db";

const DEFAULT_RETURN_ROUTE = "/workspaces";

export default function ({ editing = false, initialId = undefined, uid = "" }) {
  const router = useRouter();

  const entity: Workspace = reactive({
    id: doc(db.workspaces).id,
    owner: uid,
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

  const save = async () => {
    if (!initialId) {
      // creating a new workspace and member with owner role
      entity.created = new Date().toISOString();

      try {
        const workspaceRef = doc(db.workspaces, entity.id);
        const workspaceMemberOwnerRef = doc(
          db.workspaceMembers(entity.id),
          uid
        );
        await setDoc(workspaceRef, entity);
        await setDoc(workspaceMemberOwnerRef, { role: 9 });
        router.push(DEFAULT_RETURN_ROUTE);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      // editing an existing workspace
      setDoc(doc(db.workspaces, entity.id), entity);
      router.push(DEFAULT_RETURN_ROUTE);
    }
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

    if (!entity.name || !entity.name.trim()) {
      return true;
    }

    return false;
  });

  const addInvite = () => {
    return 0;
  };

  const idDisabled = computed(() => editing);

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
