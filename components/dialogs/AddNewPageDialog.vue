<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    hide-overlay
    :disabled="!isLoggedIn"
    max-width="500"
  >
    <template #activator="{ on, attrs }">
      <div class="additional-page-item" v-bind="attrs" v-on="on">
        <v-icon
          class="additional-page-item-icon"
          color="var(--light-gray3)"
          size="24px"
        >mdi-plus</v-icon>
        <span class="additional-page-item-text">New page</span>
      </div>
    </template>

    <div class="dialog">
      <div class="dialog-header">
        <span>New page</span>
      </div>
      <div class="dialog-body flex-column" style="margin-bottom: auto">
        <input
          v-model="pageName"
          class="input"
          type="text"
          placeholder="Enter page name"
        />
        <strong v-if="error" style="color: var(--red)">{{ error }}</strong>
      </div>
      <div class="dialog-footer">
        <v-spacer></v-spacer>
        <v-btn plain @click="createPage">Apply</v-btn>
        <v-btn plain color="red" @click="dialog = false">Cancel</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddNewPageDialog',
  data: () => ({
    dialog: false,
    pageName: '',
    error: ''
  }),
  computed: mapState('auth', ['isLoggedIn']),
  methods: {
    createPage() {
      if (!this.pageName) {
        this.error = "You don't provide new page name"
        return
      }

      this.$store.dispatch('pages/createPage', this.pageName)
      this.dialog = false
    }
  }
}
</script>

<style scoped></style>
