<template>
  <div class="wrapper">
    <div class="p-2 flex justify-end items-center">
      <button
        @click="openMenu()"
        class="inline-flex items-center mr-4"
        tabindex="-1"
      >
        Fullscreen
        <app-icon icon="solid:arrows-expand" class="ml-1" />
      </button>

      <button @click="openMenu()" class="inline-flex items-center">
        Menu <app-icon icon="menu" class="ml-1" />
      </button>

      <app-menu />
    </div>
    <div class="h-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import appMenu from "@/components/Menu.vue";
import appIcon from "@/components/Icon.vue";

import { useStore } from "vuex";

export default {
  components: {
    appMenu,
    appIcon,
  },
  setup() {
    const store = useStore();

    const closeMenu = () => {
      store.dispatch("ui/closeMenu");
    };

    const openMenu = () => {
      store.dispatch("ui/openMenu");
    };

    return { closeMenu, openMenu };
  },
};
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

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  height: 100%;
  width: 100%;
}
</style>
