<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    hide-overlay
    max-width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" text v-on="on">Log in</v-btn>
    </template>
    <div class="dialog">
      <div class="dialog-header">
        {{ !registerMode ? 'Log in' : 'Registration' }}
      </div>
      <div class="dialog-body flex-column">
        <input
          v-if="registerMode"
          v-model="username"
          type="text"
          class="input mb-2"
          placeholder="Enter your username"
        />
        <input
          v-model="email"
          type="email"
          class="input"
          placeholder="Enter your email"
        />
        <password-input v-model="password" placeholder="Enter your password" />
      </div>
      <div class="dialog-footer">
        <v-btn v-if="!registerMode" color="teal darken-2" @click="login"
          >Log in</v-btn
        >
        <v-btn v-else color="teal darken-2" @click="register">Register</v-btn>
        <v-btn text color="red" @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="registerMode = !registerMode">{{
          !registerMode ? 'Registration' : 'Log in'
        }}</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoginDialog',
  data: () => ({
    dialog: false,
    username: '',
    email: '',
    password: '',
    registerMode: false,
  }),
  methods: {
    login() {
      if (!this.email || !this.password) {
        this.$store.commit('updateSnackbar', {
          state: true,
          message: `Вы не указали ${!this.email ? 'email' : 'пароль'}`,
          type: 'error',
          apiError: false,
        })
        return
      }

      this.$store.dispatch('authorize', {
        email: this.email,
        password: this.password,
      })
      this.dialog = false
    },
    register() {
      if (!this.username) {
        this.$store.commit('updateSnackbar', {
          state: true,
          message: 'Вы не указали ник',
          type: 'error',
          apiError: false,
        })
        return
      }

      if (!this.email || !this.password) {
        this.$store.commit('updateSnackbar', {
          state: true,
          message: `Вы не указали ${!this.email ? 'email' : 'пароль'}`,
          type: 'error',
          apiError: false,
        })
        return
      }

      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      this.dialog = false
    },
  },
}
</script>

<style scoped></style>
