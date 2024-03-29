<template>
  <app-modal v-model="showPasswordReset" title="Passwort zurücksetzen">
    <div class="flex flex-col space-y-4">
      <p>Bitte gib deine Email Adresse an</p>
      <input id="email" v-model="email" class="input" placeholder="Email" />
      <app-error-box v-model="passwordResetError"></app-error-box>
      <div class="flex justify-between">
        <button class="btn btn-blue" @click="showPasswordReset = false">
          Cancel
        </button>
        <button class="btn btn-blue" @click="() => sendPasswordReset(email)">
          OK
        </button>
      </div>
    </div>
  </app-modal>
  <div class="max-w-md p-4 flex flex-col space-y-3">
    <h1 v-if="mode == Mode.LOGIN">Login</h1>
    <h1 v-else>Register</h1>
    <input
      v-model="email"
      type="text"
      placeholder="Email"
      class="input"
      @keyup.enter="submit"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="input"
      @keyup.enter="submit"
    />
    <input
      v-if="mode == Mode.REGISTER"
      v-model="passwordConfirmation"
      type="password"
      placeholder="Password wiederholen"
      class="input"
      @keyup.enter="submit"
    />
    <div v-if="mode == Mode.LOGIN" class="flex flex-col space-y-3">
      <button class="btn btn-blue" @click="submit">Login</button>
      <button class="btn text-gray-500" @click="mode = Mode.REGISTER">
        Register...
      </button>
      <button class="btn text-gray-500" @click="showPasswordReset = true">
        Passwort vergessen...
      </button>
    </div>
    <div v-else class="flex flex-col space-y-3">
      <button class="btn btn-blue" @click="submit">Register</button>
      <button class="btn text-gray-500" @click="mode = Mode.LOGIN">
        Login...
      </button>
    </div>
    <app-error-box v-model="errMsg"></app-error-box>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import resolveAuthErrors from "@/utils/resolveAuthErrors";

import appModal from "@/components/ui/Modal.vue";
import appErrorBox from "@/components/ui/ErrorBox.vue";

import { useRouter, useRoute } from "vue-router";
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const errMsg = ref();
const router = useRouter();
const route = useRoute();
const inviteId = route.query.invite as string;
const inviteWorkspace = route.query.workspace as string;

console.log("inviteId:", inviteId);
console.log("inviteWorkspace:", inviteWorkspace);

const DEFAULT_REDIRECT = { name: "settings" };

enum Mode {
  LOGIN,
  REGISTER,
}

const mode = ref<Mode>(Mode.LOGIN);

const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(getAuth(), email, password)
    .then((data) => {
      if (inviteId && inviteWorkspace) {
        router.push({
          name: "workspaces-invite-claim",
          params: { wid: inviteWorkspace, id: inviteId },
        });
        return;
      }
      router.push(DEFAULT_REDIRECT);
    })
    .catch((error) => {
      errMsg.value = resolveAuthErrors(error);
    });
};

const register = (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  if (password !== passwordConfirmation) {
    errMsg.value = "Passwörter stimmen nicht überein";
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((data) => {
      if (inviteId && inviteWorkspace) {
        router.push({
          name: "workspaces-invite-claim",
          params: { wid: inviteWorkspace, id: inviteId },
        });
        return;
      }
      router.push(DEFAULT_REDIRECT);
    })
    .catch((error) => {
      errMsg.value = resolveAuthErrors(error);
    });
};

const showPasswordReset = ref(false);
const passwordResetError = ref("");

const sendPasswordReset = (email: string) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      showPasswordReset.value = false;
      passwordResetError.value = "";
    })
    .catch((error) => {
      passwordResetError.value = resolveAuthErrors(error);
    });
};

const submit = () => {
  if (mode.value == Mode.LOGIN) {
    signIn(email.value, password.value);
  }

  if (mode.value == Mode.REGISTER) {
    register(email.value, password.value, passwordConfirmation.value);
  }
};
</script>
