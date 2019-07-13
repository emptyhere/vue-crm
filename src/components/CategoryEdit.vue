<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'CategoriesEdit' | localize }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="(item) of categories"
            :key="item.id"
            :value="item.id">{{item.title}}</option>
          </select>

          <label>{{ 'RecordSelect' | localize }}</label>

        </div>

        <div class="input-field">
          <input id="name" type="text"
           v-model.trim="title"
           :class="{invalid: $v.title.$dirty && !$v.title.required}" />

          <label for="name">{{ 'CategoriesMiniTitle' | localize }}</label>

          <span class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.title.required">
          {{ 'CategoriesEnterTitle' | localize }}</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit"
          :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" />

          <label for="limit">{{ 'CategoriesLimit' | localize }}</label>

          <span class="helper-text invalid"
          v-if="$v.limit.$dirty && !$v.limit.minValue">
          {{ 'RecordMiVal' | localize }} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'CategoriesUpdate' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Category updated')
        this.$emit('updated', categoryData)
      }
      catch (e) {}
    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  watch: {
    current(value) {
      const {title, limit} = this.categories.find(item => item.id === value)
      this.title = title
      this.limit = limit  
    }
  },
  created() {
    const {title, limit, id} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
