<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="ui.closeMenu">
      <div class="fixed inset-0 z-10 overflow-y-auto bg-yellow-200">
        <div class="min-h-screen min-w-screen bg-yellow-100 px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                p-6
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
                pt-12
              "
            >
              <button
                class="app-menu-button absolute top-6 right-6"
                @click="ui.closeMenu"
              >
                <x-icon class="w-8 h-8"></x-icon>
              </button>

              <div class="mt-8">
                <div class="flex flex-col uppercase" @click="ui.closeMenu">
                  <router-link class="app-menu-link" to="/">Home</router-link>
                  <router-link class="app-menu-link" to="/products"
                    >Products</router-link
                  >
                  <router-link class="app-menu-link" to="/settings"
                    >Settings</router-link
                  >
                  <router-link class="app-menu-link" to="/about"
                    >About</router-link
                  >
                </div>
              </div>

              <!-- Mobile Pay as last tabindex -->
              <div class="absolute top-6 left-6 flex items-center space-x-3">
                <router-link
                  to="/pay"
                  class="app-menu-button flex items-center text-green-500"
                  @click="ui.closeMenu"
                  ><device-mobile-icon class="w-8 h-8"></device-mobile-icon
                  >Pay</router-link
                >
                <button
                  class="app-menu-button text-green-500 flex items-center"
                  @click="refresh"
                >
                  <refresh-icon class="w-8 h-8" /><span class="ml-0.5"
                    >Refresh</span
                  >
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";

import { XIcon } from "@heroicons/vue/solid";
import { DeviceMobileIcon, RefreshIcon } from "@heroicons/vue/outline";

import useUiStore from "@/store/ui";

const ui = useUiStore();

const refresh = () => {
  window.location.reload();
};

const isOpen = computed(() => ui.menu);
</script>

<style scoped>
/* see https://tailwindcss.com/docs/outline */
.focusable {
  @apply focus:outline-black focus-visible:outline-black;
}

.app-menu-link,
.app-menu-button {
  @apply focus:outline-black focus-visible:outline-black;
}

.app-menu-link {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 300;
  color: rgba(51, 51, 51);
  display: block;
}

.app-menu-link:hover,
.app-menu-link:focus,
.app-menu-button:hover,
.app-menu-button:focus {
  color: rgba(255, 102, 0);
}
</style>
