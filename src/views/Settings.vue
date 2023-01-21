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
        <h3>Modus</h3>
        <div class="my-3">
          <label class="flex py-2 items-center">
            <input
              v-model="settings.tillMode"
              type="radio"
              :value="TillMode.PAY"
              class="mx-3"
            />
            <div>
              <div>Bezahlen</div>
              <small class="text-secondary">Bezahlen und mitnehmen.</small>
            </div>
          </label>
          <label class="flex py-2 items-center">
            <input
              v-model="settings.tillMode"
              type="radio"
              :value="TillMode.ORDER_AND_PAY"
              class="mx-3"
            />
            <div>
              <div>Bestellen und bezahlen</div>
              <small class="text-secondary"
                >Es wird eine Bestellung erstellt. Die Rechnung wird sofort
                bezahlt.</small
              >
            </div></label
          >
          <label v-if="false" class="flex py-2 items-center">
            <input
              v-model="settings.tillMode"
              type="radio"
              :value="TillMode.ORDER_AND_PAY_LATER"
              class="mx-3"
            />
            <div>
              <div>Bestellen und später bezahlen</div>
              <small class="text-secondary"
                >Es wird eine Bestellung erstellt. Die Rechnung wird später
                bezahlt.</small
              >
            </div></label
          >
        </div>

        <h3>Belege</h3>
        <div>
          <router-link to="/receipts" class="link text-xl"
            >Belege ansehen...</router-link
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
            >Zahlungstipps anzeigen</app-switch
          >
          <app-switch v-model="settings.tillEdit"
            >Kasse live editieren</app-switch
          >
        </div>
      </section>

      <section v-if="auth.isLoggedIn">
        <h2>Account</h2>
        <div>
          Eingeloggt als <span class="font-bold">{{ auth.user?.email }}</span>
        </div>
        <div class="pt-1 flex space-x-2">
          <router-link
            class="btn btn-white inline-block flex items-center"
            :to="{ name: 'profile' }"
          >
            <cog-6-tooth-icon class="inline w-5 h-5 mr-1.5"></cog-6-tooth-icon>
            Profile
          </router-link>
          <button
            class="btn btn-white link flex items-center"
            @click="showLogoutModal = true"
          >
            <arrow-left-on-rectangle-icon class="w-5 h-5 mr-1.5" />
            Logout
          </button>
        </div>
      </section>
      <section v-else>
        <h2>Account</h2>

        <div class="pt-1 flex">
          <router-link
            class="btn border link inline-block flex items-center"
            :to="{ name: 'login' }"
          >
            <arrow-right-on-rectangle-icon class="w-5 h-5 mr-1.5" />
            Login
          </router-link>
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
            >Workspace wählen...</router-link
          >
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/solid";

import appButtonBack from "@/components/ui/ButtonBack.vue";
import appSwitch from "@/components/ui/Switch.vue";

import useSettingsStore from "@/store/settings";
import useAuthStore from "@/store/auth";

import appLogoutModal from "@/components/ui/LogoutModal.vue";

import { TillMode } from "@/types";

const settings = useSettingsStore();
const auth = useAuthStore();
const showLogoutModal = ref(false);

const hasPaymentOptions = computed(() => settings.hasPaymentOptions);
</script>

<style scoped>
section {
  @apply space-y-2 py-2;
}
h2 {
  @apply mt-3;
}
</style>
