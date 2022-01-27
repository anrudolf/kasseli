<template>
  <div class="p-4 max-w-md">
    <h1>Profile</h1>
    <div v-if="store.user != null">
      Signed in
      <div>{{ store.user.uid }} -- {{ store.user.email }}</div>
    </div>
    <button class="btn btn-blue" @click="signOut">Sign out</button>
    <div class="flex flex-col space-y-3">
      <h3 class="mt-3">Passwort ändern</h3>
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
    </div>
    <app-error-box v-model="errMsg" class="my-3"></app-error-box>
    <app-success-box v-model="successMsg" class="my-3"></app-success-box>
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
} from "firebase/auth";

import appErrorBox from "@/components/ui/ErrorBox.vue";

import resolveAuthErrors from "@/utils/resolveAuthErrors";

import appSuccessBox from "@/components/ui/SuccessBox.vue";

import useAuthStore from "@/store/auth";

const router = useRouter();

const store = useAuthStore();

const errMsg = ref("");
const successMsg = ref("");

const signOut = () => {
  getAuth().signOut();
  router.push("/signin");
};

const currentPassword = ref("");
const newPassword = ref("");
const newPasswordConfirmation = ref("");

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
    currentPassword.value = "";
    newPassword.value = "";
    newPasswordConfirmation.value = "";
    successMsg.value = "Dein Passwort wurde geändert.";
  } catch (err: any) {
    errMsg.value = resolveAuthErrors(err);
  }
};
</script>
