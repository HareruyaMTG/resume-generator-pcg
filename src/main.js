import Vue from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";
import vuetify from "./plugins/vuetify";
import VueGtm from "@gtm-support/vue2-gtm";

Vue.config.productionTip = false;
Vue.use(VueKonva, { prefix: "Konva" });
Vue.use(VueGtm, {
  id: "GTM-M9F8CB4",
});

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
