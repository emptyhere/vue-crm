<template>
   <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">{{ 'BillCur' | localize }}</span>

          <p 
          v-for="item in currencies"
          :key="item"
          class="currency-line">
            <span>
              {{getCurrency(item) | currency(item)}}
            </span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
