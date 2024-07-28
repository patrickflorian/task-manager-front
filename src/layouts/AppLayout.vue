<template>
  <v-app>
    <v-app-bar :elevation="12">
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title>Task Manager</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="task Manager" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
  export default {
    name: 'AppLayout',
  }
</script>
