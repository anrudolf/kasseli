<template>
  <app-modal
    v-model="showLogoutModal"
    title="Wirklich Ausloggen?"
    show-cancel
    show-confirm
    @confirm="auth.logout"
  >
    <p>Du bist momentan eingeloggt als {{ auth.user?.email }}</p>
  </app-modal>
  <div class="p-4 max-w-lg flex flex-col space-y-3">
    <h1>Settings</h1>
    <router-link to="/tills" class="link text-xl">Kassen</router-link>

    <h2>Zahlungsmöglichkeiten</h2>
    <app-switch v-model="settings.paymentOptions.card.enabled"
      >Karte</app-switch
    >
    <app-switch v-model="settings.paymentOptions.cash.enabled">Cash</app-switch>
    <app-switch v-model="settings.paymentOptions.app.enabled">App</app-switch>

    <h2>Workspace</h2>
    <input v-model="settings.workspace" class="input" />

    <h2>Diverses</h2>
    <app-switch v-model="settings.paymentHints.enabled"
      >Zahlungstipps</app-switch
    >

    <h2>Account</h2>
    <div v-if="auth.isLoggedIn" class="flex flex-col space-y-3">
      <div>
        <router-link :to="{ name: 'workspaces' }" class="link text-xl"
          >Workspaces</router-link
        >
      </div>
      <div>
        Eingeloggt als <span class="font-bold">{{ auth.user?.email }}</span>
        <div class="my-2">
          <button class="btn btn-blue" @click="showLogoutModal = true">
            Logout
          </button>
        </div>
      </div>
    </div>
    <div v-else class="my-2">
      <router-link class="btn btn-blue" to="/signin">Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import appSwitch from "@/components/ui/Switch.vue";

import useSettingsStore from "@/store/settings";
import useAuthStore from "@/store/auth";

import appModal from "@/components/ui/Modal.vue";

export default defineComponent({
  components: {
    appSwitch,
    appModal,
  },
  setup() {
    const settings = useSettingsStore();
    const auth = useAuthStore();
    const showLogoutModal = ref(false);

    const hasPaymentOptions = computed(() => settings.hasPaymentOptions);

    return {
      settings,
      auth,
      showLogoutModal,
      // computed
      hasPaymentOptions,
    };
  },
});
</script>
