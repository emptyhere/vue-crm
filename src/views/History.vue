<template>
    <div>
  <div class="page-title">
    <h3>Record History</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>

  <Loader v-if="loading" />

  <span v-else-if="!records.length">Records not found.
    <router-link to="/record">First, add record</router-link>
  </span>

  <section v-else>
    <HistoryTable :records="records" />
  </section>
</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>
