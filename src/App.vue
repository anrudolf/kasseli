<template>
  <div class="wrapper">
    <div class="p-2 flex items-center">
      <button @click="openMenu()">Menu</button>
      <app-menu />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="ml-auto inline w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </div>
    <div class="h-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import appMenu from "@/components/Menu.vue";
import { useStore } from "vuex";

export default {
  components: {
    appMenu,
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
