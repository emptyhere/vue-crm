<template>
<form class="card auth-card" @submit.prevent="onSubmit">
  <div class="card-content">
    <span class="card-title">Home Bookkeeping</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      >
      <label for="email">Email</label>
      <small class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >E-mail field should not be empty</small>
      <small class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Enter correct e-mail</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      >
      <label for="password">Password</label>
      <small class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Enter password</small>
      <small class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Password should be at least {{$v.password.$params.minLength.min}} characters. Now have {{password.length}} characters. </small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
      >
      <label for="name">Name</label>
      <small class="helper-text invalid"
      v-if="$v.name.$dirty && !$v.name.required"
      >Enter name</small>
      <small class="helper-text invalid"
      v-else-if="$v.name.$dirty && !$v.name.minLength"
      >Name should be at least {{$v.name.$params.minLength.min}} characters. Now have {{name.length}} characters. </small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>I agree with the rules</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Sign Up
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Already have an account?
      <router-link to="/login">Sign In</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import { constants } from 'crypto';

export default {
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { minLength: minLength(7), required },
    name: { required, minLength: minLength(3) },
    agree: { checked: v => v }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>