<template>
  <div id="app">
  <div class="container">
  <transition name="slide-fade" mode="out-in">
    <div v-if="!loaded" class="row">
      <div class="col-12 text-center">
          <h1>DATA LOADING ...</h1>
      </div>
    </div>
    <coin-list v-else></coin-list>
  </transition>
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
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
