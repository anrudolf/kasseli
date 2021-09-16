import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";

import App from "./App.vue";
import router from "./router";
import "./index.css";

registerSW();

import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
