<template>
  <v-app dark>
    <v-main>
      <user-not-activated-blank v-if="!currentUser.isActivated" />
      <div class="header">
        <v-toolbar-title class="logo">
          <v-avatar><img src="" alt="" width="32px" /></v-avatar>
          <span class="logo-text">NotesAPP</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-flex align-center">
          <login-dialog v-if="!isLoggedIn" />
          <v-menu v-else offset-y tile>
            <template #activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on">
                <img src="" alt="" />
              </v-avatar>
            </template>

            <v-card max-width="350" tile class="rounded-lg">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar size="64px">
                    <img src="" alt="" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <span class="profile-card-nickname">{{
                      currentUser.username || 'Неизвестно'
                    }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider class="ma-0"></v-divider>
              <v-card-actions>
                <v-btn text nuxt to="/settings">Settings</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="logout">Log out</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-toolbar-items>
      </div>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <global-snackbar />
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: mapState('auth', ['isLoggedIn', 'currentUser']),
  mounted() {
    this.checkLoggedIn()
  },
  methods: mapActions('auth', ['logout', 'checkLoggedIn'])
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

.profile-card-nickname {
  font-size: 1.2em;
}
</style>
