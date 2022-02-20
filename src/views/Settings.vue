<template>
  <div class="p-4 max-w-lg">
    <app-logout-modal
      v-model="showLogoutModal"
      @confirm="auth.logout"
    ></app-logout-modal>
    <app-button-back class="mb-4">Zurück</app-button-back>
    <div class="space-y-4 divide-y-4 divide-gray-300">
      <h1>Settings</h1>

      <section>
        <h2>Kasse</h2>
        <div>
          <router-link to="/tills" class="link text-xl"
            >Kasse wählen...</router-link
          >
        </div>

        <h3>Zahlungsmöglichkeiten</h3>
        <div>
          <app-switch v-model="settings.paymentOptions.card.enabled"
            >Karte</app-switch
          >
          <app-switch v-model="settings.paymentOptions.cash.enabled"
            >Cash</app-switch
          >
          <app-switch v-model="settings.paymentOptions.app.enabled"
            >App</app-switch
          >
        </div>

        <h3>Diverses</h3>
        <div>
          <app-switch v-model="settings.paymentHints.enabled"
            >Zahlungstipps</app-switch
          >
        </div>
      </section>

      <section v-if="auth.isLoggedIn">
        <h2>Workspace</h2>
        <p v-if="settings.hasWorkspaceSelected" class="text-secondary">
          Es ist ein privater Workspace aktiviert.
        </p>
        <p v-else class="text-secondary">Es ist kein Workspace aktiviert.</p>
        <p>
          <router-link :to="{ name: 'workspaces' }" class="link text-xl"
            >Select Workspace</router-link
          >
        </p>
      </section>

      <section v-if="auth.isLoggedIn">
        <h2>Account</h2>

        <div>
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
      </section>
      <section v-else>
        <h2>Account</h2>

        <router-link
          class="btn border link inline-block flex items-center"
          :to="{ name: 'login' }"
        >
          <login-icon class="w-5 h-5 mr-1.5"></login-icon>
          Login
        </router-link>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { LogoutIcon, LoginIcon, CogIcon } from "@heroicons/vue/solid";

import appButtonBack from "@/components/ui/ButtonBack.vue";
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
section {
  @apply space-y-2 py-3;
}
</style>
