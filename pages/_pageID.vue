<template>
  <div class="page-content">
    <div class="page-notes">
      <span class="page-title">{{ currentPage.name }}</span>
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
      <div v-else style="position: relative">
        <span class="no-notes-text">Click here to create new note</span>
      </div>
    </div>
    <div class="adding-notes-area" @click="addNote"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'NotesPage',
  layout: 'notes',
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
    ...mapState('notes', ['currentNotes']),
    ...mapState('pages', ['currentPage']),
    ...mapState('auth', ['currentUser']),
    ...mapGetters('pages', ['rootPages'])
  },
  watch: {
    rootPages(v) {
      if (v.length <= 0) {
        this.$router.push({ path: '/' })

        this.$store.commit('updateSnackbar', {
          state: true,
          message: 'You should create new page',
          type: 'warning',
          apiError: false
        })
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('auth')) {
      this.$router.push({ path: '/' })
    }

    this.setCurrentPage(this.pageId)
    this.getNotes(this.pageId)
  },
  methods: {
    ...mapActions('pages', ['setCurrentPage', 'editPage']),
    ...mapActions('notes', ['getNotes']),
    addNote() {
      this.$store.commit('notes/addNote', { pageId: this.pageId, author: this.currentUser.userId })
      setTimeout(() => {
        this.$refs[
          this.currentNotes[this.currentNotes.length - 1]?.noteId
        ][0]?.focus()
      }, 100)
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
    }
  }
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
  color: var(--light-gray2);
  font-size: 1.5em;
  font-weight: 300;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
