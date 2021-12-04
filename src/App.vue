<template>
  <div class="wrapper">
    <div class="p-2 flex justify-end items-center">
      <button v-if="false" class="inline-flex items-center mr-4" tabindex="-1">
        Fullscreen
        <app-icon icon="solid:arrows-expand" class="ml-1" />
      </button>

      <button class="inline-flex items-center" @click="openMenu()">
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

import useUiStore from "@/store/ui";
import useProductStore from "@/store/products";
import useTillStore from "@/store/till";

export default {
  components: {
    appMenu,
    appIcon,
  },
  setup() {
    const uiStore = useUiStore();
    const productStore = useProductStore();
    const tillStore = useTillStore();

    productStore.init();
    tillStore.init();

    return { closeMenu: uiStore.closeMenu, openMenu: uiStore.openMenu };
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
  grid-template-rows: 36px 1fr;
  height: 100%;
  width: 100%;
}

@media (min-width: 640px) {
  .wrapper {
    grid-template-rows: 50px 1fr;
  }
}
</style>
