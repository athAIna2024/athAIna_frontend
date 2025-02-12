import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routes.js";
import "./assets/main.css";
import pinia from "../stores/piniaPersist";
import { useAuthStore } from "../stores/authStore";

const app = createApp(App);

app.use(createPinia()); // pinia store instance

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isLoggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use(pinia); // pinia store instance
app.use(router);
app.mount("#app");
