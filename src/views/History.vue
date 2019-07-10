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
    <HistoryTable :records="items" />

    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />
  </section>
</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from "@/mixins/pagination.mixin"

export default {
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(this.records.map((record) => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>
