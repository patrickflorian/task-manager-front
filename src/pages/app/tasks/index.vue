<template>
  <v-data-table :items="tasks"></v-data-table>
</template>

<script>
  import axios from 'axios'

  axios.defaults.baseURL = 'http://localhost:8000'

  export default {
    data () {
      return {
        tasks: [],
      }
    },
    created () {
      this.fetchTasks()
    },
    methods: {
      async fetchTasks () {
        try {
          const token = localStorage.getItem('auth-token')
          console.log(token)
          const response = await axios.get('/api/v1/tasks', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          this.tasks = response.data
        } catch (error) {
          console.error(error)
        }
      },
    },
  };
</script>
