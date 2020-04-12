import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.filter("celsius", value => {
  return `${Math.round(value)}\xB0C`;
});

Vue.filter("formatedDate", timestamp => {
  const d = new Date(timestamp * 1000);
  const weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
  const day = weekday[d.getDay()];
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  return `${date} ${day}, ${hour}:${min}`;
});

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
