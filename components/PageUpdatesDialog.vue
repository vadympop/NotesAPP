<template>
  <v-dialog transition="dialog-bottom-transition" hide-overlay max-width="800">
    <template #activator="{ on, attrs }">
      <v-icon
        class="hoverable-icon"
        color="var(--light-gray3)"
        v-bind="attrs"
        v-on="on"
      >
        mdi-clock-outline
      </v-icon>
    </template>

    <div class="dialog"></div>
  </v-dialog>
</template>

<script>
export default {
  name: 'PageUpdatesDialog',
}
</script>

<style scoped></style>
