<template>
  <div class="app-wrapper">
    <div class="p-2 flex justify-end items-center gap-x-2">
      <button v-if="false" class="inline-flex items-center mr-4" tabindex="-1">
        Fullscreen
        <app-icon icon="solid:arrows-expand" class="ml-1" />
      </button>

      <div id="context-menu"></div>

      <button class="inline-flex items-center" @click="uiStore.openMenu">
        Menu <app-icon icon="menu" class="ml-1" />
      </button>

      <app-menu />
    </div>
    <div class="h-full">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import appMenu from "@/components/Menu.vue";

import appIcon from "@/components/ui/Icon.vue";

import useUiStore from "@/store/ui";
import useSettingsStore from "@/store/settings";

import { initWorkspace } from "@/services/workspaces";

const uiStore = useUiStore();
const settings = useSettingsStore();

initWorkspace(settings.workspace);
</script>

<style lang="scss">
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style scoped>
.app-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: clamp(36px, 10vh, 50px) 1fr;
  height: 100vh;
  width: 100%;
}
</style>
