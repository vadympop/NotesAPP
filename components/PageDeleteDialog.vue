<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    hide-overlay
    max-width="500"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        class="hoverable-icon"
        color="var(--light-gray3)"
        v-bind="attrs"
        v-on="on"
      >
        mdi-delete-outline
      </v-icon>
    </template>

    <div class="dialog">
      <div class="dialog-header">
        <strong>Are you sure you want to delete this page?</strong>
      </div>
      <div class="dialog-body flex-column" style="margin-bottom: auto">
        <div>
          <span>You want to delete </span>
          <strong>{{ specifiedPageName }}</strong>
        </div>
        <span
          >When you click a button "Delete" this page and all her nested pages
          will move to trash</span
        >
      </div>
      <div class="dialog-footer">
        <v-spacer></v-spacer>
        <v-btn plain color="red" @click="removePage">Delete</v-btn>
        <v-btn plain @click="dialog = false">Cancel</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageDeleteDialog',
  props: {
    pageId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    specifiedPageName() {
      const foundPage = this.pages.find((page) => page._id === this.pageId)
      return foundPage ? foundPage.name : 'Unknown'
    },
    ...mapState(['pages']),
  },
  methods: {
    removePage() {
      this.$store.dispatch('removePage', this.pageId)
      this.dialog = false
      this.$router.push({ path: `/${this.pages[0]._id}` })
    },
  },
}
</script>

<style scoped></style>
