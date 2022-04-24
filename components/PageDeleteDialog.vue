<template>
  <v-dialog transition="dialog-bottom-transition" v-model="dialog" hide-overlay max-width="500">
    <template #activator="{ on, attrs }">
      <v-icon
        class="hoverable-icon"
        color="var(--todos-list)"
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
      <div class="dialog-body" style="margin-bottom: auto">
        <span>When you click a button "Delete" this page will move to trash</span>
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
import {mapState} from "vuex";

export default {
  name: "PageDeleteDialog",
  data: () => ({
    dialog: false
  }),
  computed: mapState(['pages']),
  methods: {
    removePage () {
      this.$store.dispatch('removePage', this.$route.params.pageID)
      this.dialog = false
      this.$router.push({ path: `/${this.pages[0].id}` })
    }
  }
}
</script>

<style scoped>

</style>
