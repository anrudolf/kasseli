<template>
  <app-modal v-model="showUpdatePasswordModal" title="Paswort ändern">
    <div class="flex flex-col space-y-3">
      <input
        v-model="currentPassword"
        type="password"
        placeholder="Altes Passwort"
        class="input"
      />
      <input
        v-model="newPassword"
        type="password"
        placeholder="Neues Passwort"
        class="input"
      />
      <input
        v-model="newPasswordConfirmation"
        type="password"
        placeholder="Neues Passwort (Wiederholung)"
        class="input"
      />
      <button class="btn btn-blue ali" @click="initiatePasswordUpdate">
        Passwort ändern
      </button>
      <app-error-box v-model="errMsg" class="my-3"></app-error-box>
      <app-success-box v-model="successMsg" class="my-3"></app-success-box>
    </div>
  </app-modal>

  <app-modal v-model="showUpdateEmailModal" title="Email ändern">
    <div class="flex flex-col space-y-3">
      <input
        v-model="currentPassword"
        type="password"
        placeholder="Passwort"
        class="input"
      />
      <input v-model="newEmail" placeholder="Neue Email" class="input" />
      <input
        v-model="newEmailConfirmation"
        placeholder="Neues Email (Wiederholung)"
        class="input"
      />
      <button class="btn btn-blue ali" @click="initiateEmailUpdate">
        Email ändern
      </button>
      <app-error-box v-model="errMsg" class="my-3"></app-error-box>
      <app-success-box v-model="successMsg" class="my-3"></app-success-box>
    </div>
  </app-modal>

  <div class="p-4 max-w-md">
    <h1>Profile</h1>
    <div v-if="store.user != null">
      Signed in
      <div>{{ store.user.uid }} -- {{ store.user.email }}</div>
    </div>
    <div class="flex flex-col space-y-3">
      <button class="btn btn-blue" @click="signOut">Sign out</button>
      <button class="btn btn-blue" @click="showUpdatePasswordModal = true">
        Passwort ändern
      </button>
      <button class="btn btn-blue" @click="showUpdateEmailModal = true">
        Email ändern
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
} from "firebase/auth";

import appModal from "@/components/ui/Modal.vue";
import appSuccessBox from "@/components/ui/SuccessBox.vue";
import appErrorBox from "@/components/ui/ErrorBox.vue";

import resolveAuthErrors from "@/utils/resolveAuthErrors";

import useAuthStore from "@/store/auth";

const router = useRouter();

const store = useAuthStore();

const errMsg = ref("");
const successMsg = ref("");

const signOut = () => {
  getAuth().signOut();
  router.push("/signin");
};

const showUpdatePasswordModal = ref(false);
const showUpdateEmailModal = ref(false);

const currentPassword = ref("");
const newPassword = ref("");
const newPasswordConfirmation = ref("");
const newEmail = ref("");
const newEmailConfirmation = ref("");

const initiatePasswordUpdate = async () => {
  if (newPassword.value !== newPasswordConfirmation.value) {
    errMsg.value = "Passwörter stimmen nicht überein";
    return;
  }

  const { currentUser } = getAuth();

  if (!currentUser || !currentUser.email) {
    return;
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    currentPassword.value
  );

  try {
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword.value);

    successMsg.value = "Dein Passwort wurde geändert.";

    currentPassword.value = "";
    newPassword.value = "";
    newPasswordConfirmation.value = "";
  } catch (err: any) {
    errMsg.value = resolveAuthErrors(err);
  }
};

const initiateEmailUpdate = async () => {
  if (newEmail.value !== newEmailConfirmation.value) {
    errMsg.value = "Emails stimmen nicht überein";
    return;
  }

  const { currentUser } = getAuth();

  if (!currentUser || !currentUser.email) {
    return;
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    currentPassword.value
  );

  try {
    await reauthenticateWithCredential(currentUser, credential);
    await updateEmail(currentUser, newEmail.value);

    successMsg.value = `Deine Email wurde geändert auf ${newEmail.value}.`;

    currentPassword.value = "";
    newEmail.value = "";
    newEmailConfirmation.value = "";
  } catch (err: any) {
    errMsg.value = resolveAuthErrors(err);
  }
};
</script>
