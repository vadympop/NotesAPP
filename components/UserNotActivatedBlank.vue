<template>
  <div class="blank">
    <span
      >Your account isn't activated! View activation mail in your email</span
    >
    <v-btn
      depressed
      small
      color="teal darken-2"
      class="ml-10"
      @click="sendActivationMail"
    >
      Send activation mail AGAIN
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'UserNotActivatedBlank',
  methods: {
    async sendActivationMail() {
      await this.$axios.post('users/activate/send')
      this.$store.commit('updateSnackbar', {
        state: true,
        message: 'Activation mail sent successfully',
        type: 'success',
        apiError: false
      })
    }
  }
}
</script>

<style scoped>
.blank {
  background-color: var(--yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-gray);
  font-weight: 500;
  font-size: 0.9em;
  padding: 5px 0;
}
</style>
