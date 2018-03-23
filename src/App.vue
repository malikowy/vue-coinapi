<template>
  <div id="app">
  <div class="container">
    <div v-if="!loaded" class="row">
      <div class="col-12 text-center">
          <h1>DATA LOADING ...</h1>
      </div>
    </div>
    <coin-list v-else></coin-list>
  </div>
  </div>
</template>

<script>
import CoinList from "./components/CoinList.vue";

export default {
  name: "App",
  components: {
    coinList: CoinList
  },
  computed: {
    loaded() {
      return this.$store.state.loaded;
    }
  }
};
</script>
