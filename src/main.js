import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./assets/tailwind.css";

import { createDatabase } from "./database";

const pinia = createPinia();
const database = createDatabase();

const app = createApp(App);

database
  .then((db) => {
    app.use(db).use(pinia);
  })
  .then(() => {
    app.mount("#app");
  });
