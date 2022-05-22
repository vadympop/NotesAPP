<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    hide-overlay
    max-width="500"
  >
    <template #activator="{ on, attrs }">
      <div class="activator" v-bind="attrs" v-on="on">
        <v-icon class="activator-icon" color="var(--light-gray3)" size="24px"
          >mdi-trash-can-outline</v-icon
        >
        <span class="activator-text">Trash</span>
      </div>
    </template>

    <div class="dialog">
      <div class="dialog-header">Trash</div>
      <div class="dialog-body">
        <div v-if="trash.length > 0" style="width: 100%">
          <div v-for="page of filteredTrash" :key="page._id" class="trash-page">
            <v-icon color="var(--light-gray3)" size="24px">
              mdi-file-document-outline
            </v-icon>
            <span class="ml-2">{{ page.name }}</span>
            <v-spacer></v-spacer>
            <button-icon
              icon="mdi-undo"
              tooltip="Restore page"
              @click="restorePageFromTrash(page._id)"
            />
            <button-icon
              icon="mdi-trash-can"
              tooltip="Delete page permanently"
              @click="removePage(page._id)"
            />
          </div>
        </div>
        <nothing-to-show v-else />
      </div>
      <div class="dialog-footer" style="margin-top: auto">
        <v-btn text color="red" @click="dialog = false">Close</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TrashDialog',
  data: () => ({
    pageName: '',
    dialog: false
  }),
  computed: {
    ...mapState('pages', ['trash']),
    filteredTrash() {
      return this.trash.filter((page) => page.name.includes(this.pageName))
    }
  },
  methods: mapActions('pages', ['restorePageFromTrash', 'removePage'])
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

.trash-page {
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  border-radius: var(--border-radius);
  cursor: pointer;
}

.trash-page:hover {
  background-color: var(--gray);
}
</style>
