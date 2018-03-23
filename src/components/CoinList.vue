<template>
    <div class="row">
        <h2 class="d-block mx-auto">Wszystkich wpisów: {{ filteredCoins.length }}</h2>
        <div class="col-12 text-center my-2">
        <input type="text" class="form-control mb-2" placeholder="Coin name"
         v-model="filterCoins">
        <button class="btn btn-primary" @click.prevent="sortRank">SORT Rank</button>
        <button class="btn btn-primary" @click.prevent="sortAlphabet">SORT ABC</button>
        <button class="btn btn-primary" @click.prevent="sortUSD">SORT USD</button>
        <button class="btn btn-primary" @click.prevent="sortBTC">SORT BTC</button>
        <button class="btn btn-primary ml-4" @click.prevent="reverseDirection">REVERSE ORDER</button>
        </div>
        <div class="col-12">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Symbol</th>
                <th scope="col">Ranga</th>
                <th scope="col">Wartość USD</th>
                <th scope="col">Wartość BTC</th>
              </tr>
            </thead>
             <transition-group name="slide" tag="tbody">
              <tr v-for="(coin, index) in filteredCoins" :key="index">
                  <th scope="row">{{ coin.name }}</th>
                  <td>{{ coin.symbol }}</td>
                  <td>{{ coin.rank }}</td>
                  <td>{{ coin.price_usd }}</td>
                  <td>{{ coin.price_btc }}</td>
                </tr>
                </transition-group> 
        </table>
        </div>
    </div>
</template>

<script>
export default {
  name: "CoinList",
  data() {
    return {
      filterCoins: ""
    };
  },
  methods: {
    reverseDirection() {
      return this.$store.state.apiData.reverse();
    },
    sortAlphabet() {
      return this.$store.state.apiData.sort(function(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    sortRank() {
      return this.$store.state.apiData.sort(function(a, b) {
        return a.rank - b.rank;
      });
    },
    sortUSD() {
      return this.$store.state.apiData.sort(function(a, b) {
        return b.price_usd - a.price_usd;
      });
    },
    sortBTC() {
      return this.$store.state.apiData.sort(function(a, b) {
        return b.price_btc - a.price_btc;
      });
    }
  },
  computed: {
    coins() {
      return this.$store.state.apiData;
    },
    filteredCoins() {
      return this.$store.state.apiData.filter(element => {
        return (
          element.name.toLowerCase().match(this.filterCoins.toLowerCase()) ||
          element.symbol.toLowerCase().match(this.filterCoins.toLowerCase())
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  margin: 5px 5px;
}
ul {
  display: flex;
  list-style: none;
  margin-bottom: 0.2rem;
  padding: 0;

  li {
    text-align: center;
    border: 1px solid red;
    flex: 1;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(0, 50%);
}
.slide-leave-to {
  transform: translate(0, -50%);
  opacity: 0;
}
.slide-move {
  transition: 0.3s;
}
</style>
