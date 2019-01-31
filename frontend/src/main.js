import Vue from "vue";
import "./plugins/vuetify";
import Auth from "./plugins/auth";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

Vue.http.options.root = "/api";

/* Auth plugin */
Vue.use(Auth, {});

/* Moment injection */
import moment from "moment";
Object.defineProperty(Vue.prototype, "$moment", { value: moment });

new Vue({
  el: "#app",
  created: function() {
    window.Vue = this;
  },
  router,
  store,
  render: h => h(App)
});
