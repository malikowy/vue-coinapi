<template>
    <div class="row">
        <h2 class="d-block mx-auto">Wszystkich wpisów: {{ filteredCoins.length }}</h2>
        <div class="col-12 text-center mt-2">
          <input type="text" class="form-control mb-2" placeholder="Coin name"
          v-model="filterCoins">
          <div class="input-group mb-3">
            <select class="custom-select" v-model="selectedCurrency" @change="refreshCurrency">
              <option value="" disabled selected hidden>Please select</option>
              <option v-for="(currency, index) in currencies" 
              v-bind:value="currency" :key="index">{{ currency }}</option>
            </select>
            <select class="custom-select" v-model="selectedLimit" @change="refreshLimit">
              <option value="" disabled selected hidden>Limit</option>
              <option v-for="(n, index) in limits" 
              v-bind:value="n" :key="index">{{ n }}</option>
            </select>
          </div>
        </div>        
        <div class="col-12 text-center mb-3">      
          <button class="btn btn-primary" @click.prevent="sortRank">SORT Rank</button>
          <button class="btn btn-primary" @click.prevent="sortAlphabet">SORT Abc</button>
          <button class="btn btn-primary" @click.prevent="sortUSD">SORT {{ waluta }}</button>
          <button class="btn btn-primary" @click.prevent="sortBTC">SORT BTC</button>
        </div>
        <div class="col-12">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Symbol</th>
                <th scope="col">Ranga</th>
                <th scope="col">Wartość {{ waluta }}</th>
                <th scope="col">Wartość BTC</th>
              </tr>
            </thead>
             <transition-group name="slide" tag="tbody">
              <tr v-for="(coin, index) in filteredCoins" :key="index">
                  <th scope="row">{{ coin.name }}</th>
                  <td>{{ coin.symbol }}</td>
                  <td>{{ coin.rank }}</td>
                  <td>{{  coin.price_aud || 
                          coin.price_brl || 
                          coin.price_cad || 
                          coin.price_chf || 
                          coin.price_clp || 
                          coin.price_cny || 
                          coin.price_czk || 
                          coin.price_dkk || 
                          coin.price_eur || 
                          coin.price_gbp || 
                          coin.price_hkd || 
                          coin.price_huf || 
                          coin.price_idr || 
                          coin.price_ils || 
                          coin.price_inr || 
                          coin.price_jpy || 
                          coin.price_krw || 
                          coin.price_mxn || 
                          coin.price_myr || 
                          coin.price_nok || 
                          coin.price_nzd || 
                          coin.price_php || 
                          coin.price_pkr || 
                          coin.price_pln || 
                          coin.price_rub || 
                          coin.price_sek || 
                          coin.price_sgd || 
                          coin.price_thb || 
                          coin.price_try || 
                          coin.price_twd || 
                          coin.price_usd || 
                          coin.price_zar | roundNumber 
                      }}
                  </td>
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
      limits: ["10", "25", "50", "75", "100"],
      filterCoins: "",
      selectedLimit: "",
      selectedCurrency: "",
      currencies: [
        "AUD",
        "BRL",
        "CAD",
        "CHF",
        "CLP",
        "CNY",
        "CZK",
        "DKK",
        "EUR",
        "GBP",
        "HKD",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "JPY",
        "KRW",
        "MXN",
        "MYR",
        "NOK",
        "NZD",
        "PHP",
        "PKR",
        "PLN",
        "RUB",
        "SEK",
        "SGD",
        "THB",
        "TRY",
        "TWD",
        "USD",
        "ZAR"
      ],
      sorted: {
        rank: true,
        letters: true,
        currency: true,
        btc: true
      }
    };
  },
  methods: {
    refreshCurrency() {
      this.$store.state.convert = this.selectedCurrency;
      this.$store.state.loaded = false;
      this.$store.dispatch("getData");
    },
    refreshLimit() {
      this.$store.state.limit = this.selectedLimit;
      this.$store.state.loaded = false;
      this.$store.dispatch("getData");
    },
    sortAlphabet() {
      if (!this.sorted.letters) {
        this.sorted.letters = true;
        return this.$store.state.apiData.sort(function(a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
      } else {
        this.sorted.letters = false;
        return this.$store.state.apiData.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }
    },
    sortRank() {
      if (!this.sorted.rank) {
        this.sorted.rank = true;
        return this.$store.state.apiData.sort(function(a, b) {
          return b.rank - a.rank;
        });
      } else {
        this.sorted.rank = false;
        return this.$store.state.apiData.sort(function(a, b) {
          return a.rank - b.rank;
        });
      }
    },
    sortUSD() {
      if (!this.sorted.currency) {
        this.sorted.currency = true;
        return this.$store.state.apiData.sort(function(a, b) {
          return a.price_usd - b.price_usd;
        });
      } else {
        this.sorted.currency = false;
        return this.$store.state.apiData.sort(function(a, b) {
          return b.price_usd - a.price_usd;
        });
      }
    },
    sortBTC() {
      if (!this.sorted.btc) {
        this.sorted.btc = true;
        return this.$store.state.apiData.sort(function(a, b) {
          return a.price_btc - b.price_btc;
        });
      } else {
        this.sorted.btc = false;
        return this.$store.state.apiData.sort(function(a, b) {
          return b.price_btc - a.price_btc;
        });
      }
    }
  },
  computed: {
    coins() {
      return this.$store.state.apiData;
    },
    waluta() {
      return this.$store.state.convert;
    },
    filteredCoins() {
      return this.$store.state.apiData.filter(element => {
        return (
          element.name.toLowerCase().match(this.filterCoins.toLowerCase()) ||
          element.symbol.toLowerCase().match(this.filterCoins.toLowerCase())
        );
      });
    }
  },
  filters: {
    roundNumber: function(value) {
      if (!value) return "";
      return Number(value).toFixed(2);
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
