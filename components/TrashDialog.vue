<template>
<v-dialog transition="dialog-bottom-transition" hide-overlay max-width="800">
  <template #activator="{ on, attrs }">
    <div class="activator" v-bind="attrs" v-on="on">
      <v-icon class="activator-icon" color="var(--todos-list)" size="24px">mdi-trash-can-outline</v-icon>
      <span class="activator-text">Trash</span>
    </div>
  </template>

  <div class="dialog">

  </div>
</v-dialog>
</template>

<script>
export default {
  name: "TrashDialog"
}
</script>

<style scoped>
.activator {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
}

.activator:hover {
  background-color: var(--light-gray);
}

.activator-icon {
  margin: 0 5px;
}

.activator-text {
  font-size: 0.95em;
  font-weight: 550;
}
</style>
