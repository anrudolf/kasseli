import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";

import App from "./App.vue";
import router from "./router";
import "./index.css";

registerSW();

import { createPinia, PiniaPlugin } from "pinia";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(pinia).use(router).mount("#app");
