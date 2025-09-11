import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useUserStore } from "@/stores/authStore";
import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const userStore = useUserStore(pinia);
userStore.init();

app.mount("#app");
