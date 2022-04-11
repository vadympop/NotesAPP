<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" hide-overlay max-width="500">
    <template #activator="{ on, attrs }">
      <div
        class="additional-page-item"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="additional-page-item-icon" color="var(--todos-list)" size="24px">mdi-plus</v-icon>
        <span class="additional-page-item-text">New page</span>
      </div>
    </template>

    <div class="dialog" style="min-height: 200px">
      <div class="dialog-header">
        <span>New page</span>
      </div>
      <div class="dialog-body" style="margin-bottom: auto">
        <input class="input" type="text" placeholder="Enter page name">
      </div>
      <div class="dialog-footer">
        <v-spacer></v-spacer>
        <v-btn plain>Apply</v-btn>
        <v-btn plain color="red" @click="dialog = false">Cancel</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "AddNewPageDialog",
  data: () => ({
    dialog: false
  })
}
</script>

<style scoped>

</style>
