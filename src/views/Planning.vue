<template>
    <div>
  <div class="page-title">
    <h3>{{ 'PlanningTitle' | localize }}</h3>
    <h4>{{info.bill | currency('RUB')}}</h4>
  </div>

  <Loader v-if="loading"/>

  <span class="center" v-else-if="!categories.length">{{ 'PlanningNotFound' | localize }}
    <router-link to="/categories">{{ 'PlanningAddCategory' | localize }}</router-link>
  </span>

  <section v-else>
    <div v-for="item in categories"
    :key="item.id">
      <span>
        <strong>{{item.title}}:</strong>
        {{item.spend | currency}} {{ 'PlanningOf' | localize }} {{item.limit | currency}}
      </span>
      <div class="progress" v-tooltip="item.tooltip">
        <div
            class="determinate"
            :class="[item.progressColor]"
            :style="{width: item.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(item => {
      const spend = records
      .filter(r => r.categoryId === item.id)
      .filter(r => r.type === 'outcome')
      .reduce((total, record) => {
        return total += +record.amount
      }, 0)

      const percent = 100 * spend / item.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green'
      : percent < 100
        ? 'yellow'
        : 'red'

      const tooltipValue = item.limit - spend
      const tooltip = `${ tooltipValue < 0 ? 'Excess on:' : 'Left:' }
      ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...item,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
    })

    this.loading = false
  }
}
</script>
