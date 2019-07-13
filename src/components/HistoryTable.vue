<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{ 'HistoryAmount' | localize }}</th>
        <th>{{ 'HistoryDate' | localize }}</th>
        <th>{{ 'HistoryCategory' | localize }}</th>
        <th>{{ 'HistoryType' | localize }}</th>
        <th>{{ 'HistoryOpen' | localize }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, index) in records"
      :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">
              {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
          v-tooltip="'Show record'"
          class="btn-small btn" 
          @click="$router.push(`/detail_record/${record.id}`)
          ">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>
