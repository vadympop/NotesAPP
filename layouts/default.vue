<template>
  <v-app dark>
    <v-main>
      <div class="header">
        <v-toolbar-title class="logo">
          <v-avatar><img src="" alt="" width="32px" /></v-avatar>
          <span class="logo-text">NotesAPP</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn nuxt text>Login</v-btn>
        </v-toolbar-items>
      </div>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid var(--light-gray2);
  background-color: var(--gray);
}

.logo {
  padding: 10px 0;
  cursor: pointer;
}

.logo-text {
  margin-left: 5px;
}
</style>
