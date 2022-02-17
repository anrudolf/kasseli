<template>
  <div class="p-4 max-w-md">
    <app-button-back>Zurück</app-button-back>

    <h1 class="mt-4">Profile</h1>
    <div v-if="store.user != null">
      <div>{{ store.user.email }}</div>
    </div>
    <div v-else>Du bist nicht eingeloggt.</div>
  </div>

  <div v-if="store.user" class="max-w-md px-4">
    <Disclosure class="my-2" as="div">
      <DisclosureButton
        class="app-disclosure-button"
        @click="showForgotPassword = !showForgotPassword"
      >
        <span>Passwort vergessen...</span>
        <chevron-up-icon
          :class="showForgotPassword ? '' : 'transform rotate-180'"
          class="w-5 h-5 text-blue-500"
        />
      </DisclosureButton>
      <div v-show="showForgotPassword">
        <DisclosurePanel class="app-disclosure-panel" static>
          <div class="flex flex-col space-y-3">
            <p>Erhalte einen Link per Email, um dein Passwort zu ändern.</p>
            <button class="btn btn-blue" @click="initiateForgotPassword">
              Link senden
            </button>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
    <Disclosure class="my-2" as="div">
      <DisclosureButton
        class="app-disclosure-button"
        @click="showUpdatePassword = !showUpdatePassword"
      >
        <span>Passwort ändern...</span>
        <chevron-up-icon
          :class="showUpdatePassword ? '' : 'transform rotate-180'"
          class="w-5 h-5 text-blue-500"
        />
      </DisclosureButton>
      <div v-show="showUpdatePassword">
        <DisclosurePanel class="app-disclosure-panel" static>
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
            <button class="btn btn-blue" @click="initiatePasswordUpdate">
              Passwort ändern
            </button>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
    <Disclosure class="my-2" as="div">
      <DisclosureButton
        class="app-disclosure-button"
        @click="showUpdateEmail = !showUpdateEmail"
      >
        <span>Email ändern...</span>
        <chevron-up-icon
          :class="showUpdateEmail ? '' : 'transform rotate-180'"
          class="w-5 h-5 text-blue-500"
        />
      </DisclosureButton>
      <div v-show="showUpdateEmail">
        <DisclosurePanel class="app-disclosure-panel" static>
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
              placeholder="Neue Email (Wiederholung)"
              class="input"
            />
            <button class="btn btn-blue" @click="initiateEmailUpdate">
              Email ändern
            </button>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
    <Disclosure class="my-2" as="div">
      <DisclosureButton
        class="app-disclosure-button"
        @click="showDeleteUser = !showDeleteUser"
      >
        <span>Account löschen...</span>
        <chevron-up-icon
          :class="showDeleteUser ? '' : 'transform rotate-180'"
          class="w-5 h-5 text-blue-500"
        />
      </DisclosureButton>
      <div v-show="showDeleteUser">
        <DisclosurePanel class="app-disclosure-panel" static>
          <div class="flex flex-col space-y-3">
            <input
              v-model="currentPassword"
              type="password"
              placeholder="Passwort"
              class="input"
            />
            <app-switch v-model="deleteConfirmation"
              >Ich möchte meinen Account unwiderruflich löschen</app-switch
            >
            <button
              class="btn btn-red"
              :disabled="!deleteConfirmation"
              @click="initiateDeleteUser"
            >
              Account löschen
            </button>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  </div>
  <div class="px-4 max-w-md">
    <app-error-box v-model="errMsg" class="my-2"></app-error-box>
    <app-success-box v-model="successMsg" class="my-2"></app-success-box>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  signOut,
  deleteUser,
} from "firebase/auth";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

import appSuccessBox from "@/components/ui/SuccessBox.vue";
import appErrorBox from "@/components/ui/ErrorBox.vue";
import appSwitch from "@/components/ui/Switch.vue";
import appButtonBack from "@/components/ui/ButtonBack.vue";

import resolveAuthErrors from "@/utils/resolveAuthErrors";

import useAuthStore from "@/store/auth";

const router = useRouter();

const store = useAuthStore();

const errMsg = ref("");
const successMsg = ref("");

const initiateSignOut = () => {
  signOut(getAuth()).then(() => {
    router.push("/settings");
  });
};

const showForgotPassword = ref(false);
const showUpdatePassword = ref(false);
const showUpdateEmail = ref(false);
const showDeleteUser = ref(false);

const currentPassword = ref("");
const newPassword = ref("");
const newPasswordConfirmation = ref("");
const newEmail = ref("");
const newEmailConfirmation = ref("");
const deleteConfirmation = ref(false);

const initiateForgotPassword = async () => {
  const { currentUser } = getAuth();

  if (!currentUser || !currentUser.email) {
    return;
  }

  try {
    await sendPasswordResetEmail(getAuth(), currentUser.email);
    showForgotPassword.value = false;
    successMsg.value = "Link wurde versendet";
  } catch (err: any) {
    errMsg.value = resolveAuthErrors(err);
  }
};

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

    showUpdatePassword.value = false;
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

    showUpdateEmail.value = false;
  } catch (err: any) {
    errMsg.value = resolveAuthErrors(err);
  }
};

const initiateDeleteUser = async () => {
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
    await deleteUser(currentUser);

    successMsg.value = `Dein Account ${newEmail.value} wurde gelöscht.`;

    currentPassword.value = "";

    showDeleteUser.value = false;
  } catch (err: any) {
    errMsg.value = resolveAuthErrors(err);
  }
};
</script>

<style scoped>
.app-disclosure-button {
  @apply flex
          justify-between
          w-full
          p-4
          text-sm
          font-medium
          text-left text-blue-900
          bg-blue-200
          rounded-t
          hover:bg-blue-300
          focus:outline-none
          focus-visible:ring
          focus-visible:ring-blue-500;
}

.app-disclosure-panel {
  @apply p-2 pt-3 text-sm text-gray-500 rounded-b border;
}
</style>
