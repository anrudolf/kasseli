<template>
  <div class="wrapper">
    <div class="p-4 flex items-center">
      <router-link to="/">Home</router-link>
      <span class="mx-1">-</span>
      <router-link to="/about">About</router-link>
      <span class="mx-1">-</span>
      <router-link to="/products">Products</router-link>
      <span class="mx-1">-</span>
      <router-link to="/cards">Karten</router-link>
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
  grid-template-rows: 60px 1fr;
  height: 100%;
  width: 100%;
}
</style>
