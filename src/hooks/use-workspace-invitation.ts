import { ref } from "vue";

import { WorkspaceRole, WorkspaceInvite } from "@/types";

import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

import db from "@/utils/db";

export default function ({
  uid = "",
  wid = "",
  id = "",
}: {
  uid: string;
  wid: string;
  id?: string;
}) {
  const entity = ref<WorkspaceInvite | null>(null);

  if (id) {
    getDoc(doc(db.workspaceInvites(wid), id))
      .then((doc) => {
        if (!doc.exists()) {
          return;
        }

        entity.value = doc.data();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const addInvite = (role: WorkspaceRole) => {
    const randomId = doc(db.workspaceInvites(wid)).id;
    setDoc(doc(db.workspaceInvites(wid), randomId), {
      id: randomId,
      workspace: wid,
      role: role,
      creator: uid,
    });
  };

  const removeInvite = (id: string) => {
    const inviteRef = doc(db.workspaceInvites(wid), id);
    deleteDoc(inviteRef);
  };

  const claim = async (id: string) => {
    try {
      const inviteRef = doc(db.workspaceInvites(wid), id);

      const inviteSnap = await getDoc(inviteRef);
      if (inviteSnap.exists()) {
        return;
      }

      const invite = inviteSnap.data();
      if (!invite) {
        return;
      }

      if (invite.creator === uid) {
        console.log(`cannot claim yourself: wid=${wid}, uid=${uid}, id=${id}`);
        return;
      }

      const workspaceMemberOwnerRef = doc(db.workspaceMembers(wid), uid);
      await setDoc(workspaceMemberOwnerRef, {
        uid: uid,
        role: invite.role,
        created: new Date().toISOString(),
      });

      await deleteDoc(inviteRef);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    entity,
    addInvite,
    removeInvite,
    claim,
  };
}
