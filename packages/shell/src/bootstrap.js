import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
const i18n = createI18n({
  locale: "nl",
  allowComposition: true,
  messages: {
    en: {
      message: {
        hello: "Sales Price",
      },
    },
    nl: {
      message: {
        hello: "Sales Price in nl",
      },
    },
  },
});

const app = createApp(App);
app.use(i18n).use(router);
app.mount("#app");
