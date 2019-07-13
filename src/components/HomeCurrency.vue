<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{ 'CurExRate' | localize }}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{ 'CurCurrency' | localize }}</th>
              <th>{{ 'CurRate' | localize }}</th>
              <th>{{ 'CurDate' | localize }}</th>
            </tr>
            </thead>

            <tbody>
            <tr 
            v-for="item in currencies"
            :key="item">
              <td>{{item}}</td>
              <td>{{rates[item].toFixed(5)}}</td>
              <td>{{date | date('date')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>
