<template>
  <div class="page-content">
    <div class="page-notes">
      <editable
        ref="pageNameInput"
        v-model="updatedPageName"
        class="page-title"
        @input="debouncedSavePageEditing"
      />
      <div v-if="sortedNotes.length > 0">
        <div v-for="note of sortedNotes" :key="note.noteId">
          <note
            :ref="note.noteId"
            :content="note.content"
            :position="note.position"
            :styles="note.styles"
            :author="note.author"
            :new-note="note.newNote"
            :page="note.page"
            :note-id="note.noteId"
            @remove-note="onRemoveNote"
          />
        </div>
      </div>
      <div v-else>
        <span class="no-notes-text">Click here to create new note</span>
      </div>
    </div>
    <div class="adding-notes-area" @click="addNote"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'NotesPage',
  layout: 'notes',
  data() {
    return {
      debouncedSavePageEditing: debounce(this.savePageEditing, 500),
      updatedPageName: '',
    }
  },
  computed: {
    sortedNotes() {
      if (!this.currentNotes) {
        return []
      }

      return [...this.currentNotes].sort(
        (note1, note2) => note1.position - note2.position
      )
    },
    pageId() {
      return this.$route.params.pageID
    },
    ...mapState(['currentNotes', 'currentPage']),
  },
  watch: {
    currentPage() {
      if (!this.updatedPageName) {
        this.updatedPageName = this.currentPage.name
        this.$refs.pageNameInput.updateText(this.updatedPageName)
      }
    },
  },
  mounted() {
    this.$store.dispatch('getUserPages')
    this.$store.dispatch('setCurrentPage', this.pageId)
  },
  methods: {
    addNote() {
      this.$store.commit('addNote', this.pageId)
      setTimeout(() => {
        this.$refs[
          this.currentNotes[this.currentNotes.length - 1]?.noteId
        ][0]?.focus()
      }, 100)
    },
    savePageEditing() {
      const updatedData = {
        pageId: this.pageId,
        name: this.updatedPageName,
        root: this.currentPage.root,
        nestedPages: this.currentPage.nestedPages,
        parent: this.currentPage.parent,
        position: this.currentPage.position,
      }

      this.$store.commit('editPage', updatedData)
    },
    onRemoveNote({ noteId }) {
      const removedNote = this.sortedNotes.find(
        (note) => note.noteId === noteId
      )
      const noteBeforeRemovedNote =
        this.sortedNotes[this.sortedNotes.indexOf(removedNote) - 1]
      if (noteBeforeRemovedNote?.noteId) {
        this.$refs[noteBeforeRemovedNote.noteId][0].focus()
      }
    },
  },
}
</script>

<style scoped>
.page-content {
  padding: 8em;
  height: 100%;
  overflow: hidden auto !important;
}

.page-content::-webkit-scrollbar {
  width: 10px;
  background-color: var(--dark-gray2);
}

.page-content::-webkit-scrollbar-thumb {
  background-color: var(--light-gray);
  transition: 0.2s all;
}
.page-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--light-gray2);
}

.page-title {
  font-size: 4em;
  font-weight: 550;
  color: #ffffff;
}

.page-title:focus-visible {
  outline: none;
}

.adding-notes-area {
  height: 100%;
  cursor: text;
}

.no-notes-text {
  margin-top: 2em;
  color: var(--light-gray2);
  font-size: 1.5em;
  font-weight: 300;
  pointer-events: none;
}
</style>
