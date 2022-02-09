<template>
  <app-logout-modal
    v-model="showLogoutModal"
    @confirm="auth.logout"
  ></app-logout-modal>
  <div class="p-4 max-w-lg flex flex-col space-y-2">
    <h1>Settings</h1>
    <router-link to="/tills" class="link text-xl">Kassen</router-link>

    <h2>Zahlungsmöglichkeiten</h2>
    <div>
      <app-switch v-model="settings.paymentOptions.card.enabled"
        >Karte</app-switch
      >
      <app-switch v-model="settings.paymentOptions.cash.enabled"
        >Cash</app-switch
      >
      <app-switch v-model="settings.paymentOptions.app.enabled">App</app-switch>
    </div>

    <h2>Diverses</h2>
    <div>
      <app-switch v-model="settings.paymentHints.enabled"
        >Zahlungstipps</app-switch
      >
    </div>

    <h2 v-if="auth.isLoggedIn">Workspace</h2>
    <div v-if="auth.isLoggedIn">
      <p v-if="settings.hasWorkspaceSelected" class="text-secondary">
        Es ist ein privater Workspace aktiviert.
      </p>
      <p v-else class="text-secondary">Es ist kein Workspace aktiviert.</p>
      <p class="mt-2">
        <router-link
          v-if="auth.isLoggedIn"
          :to="{ name: 'workspaces' }"
          class="link text-xl"
          >Select Workspace</router-link
        >
      </p>
    </div>

    <h2>Account</h2>
    <div v-if="auth.isLoggedIn">
      <div class="mb-2">
        Eingeloggt als <span class="font-bold">{{ auth.user?.email }}</span>
      </div>
      <div class="flex space-x-2">
        <router-link
          class="btn btn-white inline-block flex items-center"
          :to="{ name: 'profile' }"
        >
          <cog-icon class="inline w-5 h-5 mr-1.5"></cog-icon>
          Profile
        </router-link>
        <button
          class="btn btn-white link flex items-center"
          @click="showLogoutModal = true"
        >
          <logout-icon class="w-5 h-5 mr-1.5"></logout-icon>
          Logout
        </button>
      </div>
    </div>
    <div v-else class="my-2 flex">
      <router-link
        class="btn border link inline-block flex items-center"
        to="/signin"
      >
        <login-icon class="w-5 h-5 mr-1.5"></login-icon>
        Login
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { LogoutIcon, LoginIcon, CogIcon } from "@heroicons/vue/solid";

import appSwitch from "@/components/ui/Switch.vue";

import useSettingsStore from "@/store/settings";
import useAuthStore from "@/store/auth";

import appLogoutModal from "@/components/ui/LogoutModal.vue";

const settings = useSettingsStore();
const auth = useAuthStore();
const showLogoutModal = ref(false);

const hasPaymentOptions = computed(() => settings.hasPaymentOptions);
</script>

<style scoped>
h2 {
  margin-top: 20px !important;
}
</style>
