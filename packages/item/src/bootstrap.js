import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import "./assets/style.css";

const i18n = createI18n({
  locale: "nl",
  allowComposition: true, // you need to specify that!
  messages: {
    en: {
      message: {
        hello: "hello world",
      },
    },
    nl: {
      message: {
        hello: "hello in nl",
      },
    },
  },
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
