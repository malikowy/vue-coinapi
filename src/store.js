import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loaded: false,
    apiData: []
  },
  actions: {
    getData() {
      return new Promise((resolve, reject) => {
        axios
          .get("https://api.coinmarketcap.com/v1/ticker/")
          .then(response => {
            this.state.apiData = response.data;
            this.state.loaded = true;
            resolve();
          })
          .catch(error => {
            console.log("Error info: " + error);
            this.state.loaded = false;
            reject();
          });
      });
    }
  }
});
