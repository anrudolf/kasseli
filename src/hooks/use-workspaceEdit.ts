import { ref, reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

import { createSampleProduct, createSampleTill } from "@/utils/samples";

import { Product, Till, Workspace } from "@/types";

import db from "@/utils/db";

const DEFAULT_RETURN_ROUTE = "/workspaces";

export default function ({ editing = false, initialId = "", uid = "" }) {
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
    if (!uid) {
      return;
    }

    if (!initialId) {
      // create a new workspace and member with owner role
      // also adds a sample product and sample till
      entity.created = new Date().toISOString();

      try {
        // create workspace
        const workspaceRef = doc(db.workspaces, entity.id);
        await setDoc(workspaceRef, entity);

        // add self to members with owner role
        const workspaceMemberOwnerRef = doc(
          db.workspaceMembers(entity.id),
          uid
        );
        await setDoc(workspaceMemberOwnerRef, { role: 9 });

        // add example product
        const product: Product = createSampleProduct({ id: "example" });
        const workspaceSampleProductRef = doc(
          workspaceRef,
          "products",
          product.id
        );
        await setDoc(workspaceSampleProductRef, product);

        // add default till with sample product as favorite
        const till: Till = createSampleTill({
          id: "default",
          favorites: [
            {
              kind: "product",
              id: product.id,
              hidden: false,
            },
          ],
        });

        const workspaceDefaultTillRef = doc(workspaceRef, "tills", till.id);
        await setDoc(workspaceDefaultTillRef, till);

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
