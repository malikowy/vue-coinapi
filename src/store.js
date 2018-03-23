import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loaded: false,
    apiData: [],
    convert: "USD",
    limit: ""
  },
  actions: {
    getData() {
      const target = "https://api.coinmarketcap.com/v1/ticker/";
      let converted = "?convert=" + this.state.convert;
      let limited = "&limit=" + this.state.limit;
      let fetch = target + converted + limited;
      console.log(fetch);
      return new Promise((resolve, reject) => {
        axios
          .get(fetch)
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
