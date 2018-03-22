// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

import { store } from "./store";
import axios from "axios";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: {
    App
  },
  mounted() {
    this.$store.dispatch("getData").then(() => {
      console.log("Data loaded = " + this.$store.state.loaded);
    });
  },
  render: h => h(App)
});
