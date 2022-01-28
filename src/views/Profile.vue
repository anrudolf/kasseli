<template>
  <div class="p-4 max-w-md">
    <h1>Profile</h1>
    <div v-if="store.user != null">
      Signed in
      <div>{{ store.user.uid }} -- {{ store.user.email }}</div>
    </div>
  </div>
  <div class="max-w-md p-4">
    <Disclosure class="my-2" as="div">
      <DisclosureButton
        class="app-disclosure-button"
        @click="showSignout = !showSignout"
      >
        <span>Ausloggen...</span>
        <chevron-up-icon
          :class="showSignout ? '' : 'transform rotate-180'"
          class="w-5 h-5 text-blue-500"
        />
      </DisclosureButton>
      <div v-show="showSignout">
        <DisclosurePanel class="app-disclosure-panel" static>
          <div v-if="store.user" class="flex flex-col space-y-3">
            Du bist eingeloggt als {{ store.user.email }}
            <button class="btn btn-blue ali" @click="initiateSignOut">
              Logout
            </button>
            <app-error-box v-model="errMsg" class="my-3"></app-error-box>
            <app-success-box
              v-model="successMsg"
              class="my-3"
            ></app-success-box>
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
            <button class="btn btn-blue ali" @click="initiatePasswordUpdate">
              Passwort ändern
            </button>
            <app-error-box v-model="errMsg" class="my-3"></app-error-box>
            <app-success-box
              v-model="successMsg"
              class="my-3"
            ></app-success-box>
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
              placeholder="Neues Email (Wiederholung)"
              class="input"
            />
            <button class="btn btn-blue ali" @click="initiateEmailUpdate">
              Email ändern
            </button>
            <app-error-box v-model="errMsg" class="my-3"></app-error-box>
            <app-success-box
              v-model="successMsg"
              class="my-3"
            ></app-success-box>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
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
  signOut,
} from "firebase/auth";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

import appSuccessBox from "@/components/ui/SuccessBox.vue";
import appErrorBox from "@/components/ui/ErrorBox.vue";

import resolveAuthErrors from "@/utils/resolveAuthErrors";

import useAuthStore from "@/store/auth";

const router = useRouter();

const store = useAuthStore();

const errMsg = ref("");
const successMsg = ref("");

const initiateSignOut = () => {
  signOut(getAuth()).then(() => {
    router.push("/signin");
  });
};

const showSignout = ref(false);
const showUpdatePassword = ref(false);
const showUpdateEmail = ref(false);

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
