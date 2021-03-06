<template>
<div>
  <div class="page-title">
    <h3>{{ "RecordNew" | localize }}</h3>
  </div>

  <Loader v-if="loading" />

  <span class="center" v-else-if="!categories.length">{{ "RecordNotFound" | localize }}
    <router-link to="/categories">{{ "RecordAdd" | localize }}</router-link>
  </span>

  <form class="form" v-else @submit.prevent="onSubmit">
    <div class="input-field" >

      <select ref="select" v-model="category">
        <option
        v-for="item in categories"
        :key="item.id"
        :value="item.id">{{item.title}}</option>
      </select>

      <label>{{ "RecordSelect" | localize }}</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>{{ "RecordIncome" | localize }}</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>{{ "RecordOutcome" | localize }}</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.required}"
      >
      <label for="amount">{{ "RecordAmount" | localize }}</label>
        <span class="helper-text invalid"
        v-if="$v.amount.$dirty && !$v.amount.minValue">
        {{ "RecordMinVal" | localize }} {{$v.amount.$params.minValue.min}}</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
      >
      <label for="description">{{ "RecordDescription" | localize }}</label>
          <span class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required">
          {{ "RecordEnterDesc" | localize }}</span>
        </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ "RecordCreate" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
    validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {   
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
          ? this.info.bill + this.amount
          : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Record created')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {}

      } else {
        this.$message(`Insufficient funds on the bill (${this.amount - this.info.bill})`)
      }
    } 
  },
  destroyed() {
  if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

