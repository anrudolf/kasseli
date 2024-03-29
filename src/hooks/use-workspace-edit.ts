import { ref, reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

import {
  createSampleProduct,
  createSampleTill,
  createSampleImage,
} from "@/utils/samples";

import { Product, Till, Workspace, WorkspaceRole } from "@/types";

import db from "@/services/db";

export default function ({ editing = false, id = "", uid = "" }) {
  const router = useRouter();

  const entity: Workspace = reactive({
    id: doc(db.workspaces).id,
    creator: uid,
    name: "",
    created: new Date().toISOString(),
    archived: false,
  });

  //const { id } = toRefs(entity);

  if (id) {
    getDoc(doc(db.workspaces, id)).then((doc) => {
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

    if (!editing) {
      // create a new workspace and member with creator role
      // also adds a sample product and sample till
      entity.created = new Date().toISOString();

      try {
        // create workspace
        const workspaceRef = doc(db.workspaces, entity.id);
        await setDoc(workspaceRef, entity);

        // add self to members with creator role
        const workspaceMemberOwnerRef = doc(
          db.workspaceMembers(entity.id),
          uid
        );
        await setDoc(workspaceMemberOwnerRef, {
          uid: uid,
          role: WorkspaceRole.Creator,
          created: new Date().toISOString(),
          invite: "",
        });

        // add example image
        const sampleImage = createSampleImage();
        const workspaceSampleImageRef = doc(
          workspaceRef,
          "images",
          sampleImage.id
        );

        // add example product
        const product: Product = createSampleProduct({
          id: "example",
          imageRef: sampleImage.id,
        });
        const workspaceSampleProductRef = doc(
          workspaceRef,
          "products",
          product.id
        );

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

        await Promise.all([
          setDoc(workspaceSampleImageRef, sampleImage),
          setDoc(workspaceSampleProductRef, product),
          setDoc(workspaceDefaultTillRef, till),
        ]);

        router.go(-1);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      // editing an existing workspace
      setDoc(doc(db.workspaces, entity.id), entity);
      router.go(-1);
    }
  };

  const remove = () => {
    deleteDoc(doc(db.workspaces, entity.id));
    router.go(-2);
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
