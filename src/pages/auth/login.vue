<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="elevation-5">
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                required
                type="email"
              />
              <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
              />
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8000'

  export default {
    meta: { public: true },
    data () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async login () {
        try {
          const response = await axios.post('/api/v1/login', {
            email: this.email,
            password: this.password,
          })

          // Handle login success
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          localStorage.setItem('auth-token', response.data.data.token)
          this.$router.push('/app/tasks')
        } catch (error) {
          // Handle login errors
          console.error(error)
        }
      },
    },
  }
</script>
