<template>
  <v-app dark style="overflow: hidden; height: 100vh">
    <v-main>
      <div class="notes-layout">
        <div class="pages-list">
          <nuxt-link to="/" class="additional-page-item">
            <img
              src="https://via.placeholder.com/128x128"
              alt="avatar"
              class="main-page-item-image"
              width="48"
            />
            <span class="additional-page-item-text">USer Name</span>
          </nuxt-link>
          <v-divider></v-divider>

          <div class="mt-10">
            <page-item
              v-for="page of rootPages"
              :key="page._id"
              :page-id="page._id"
              :name="page.name"
              :position="page.position"
              :nested-pages="page.nestedPages"
              :parent="page.parent"
              :root="page.root"
            />
          </div>

          <v-spacer></v-spacer>

          <trash-dialog />
          <v-divider class="mt-10"></v-divider>
          <add-new-page-dialog />
        </div>
        <div class="notes-page">
          <page-header />
          <Nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'NotesLayout',
  data() {
    return {
      savedNotes: [],
      debouncedSaveNewNotes: debounce(this.saveNewNotes),
      debouncedRemoveNotes: debounce(this.applyRemovedNotes),
      debouncedApplyNotesChanges: debounce(this.applyChangesInNotes),
    }
  },
  computed: {
    pageNotes() {
      return this.notes[this.pageId]
    },
    pageNewNotes() {
      return this.newNotes.filter((note) => note.page === this.pageId)
    },
    pageId() {
      return this.$route.params.pageID
    },
    ...mapState(['newNotes', 'removedNotes', 'changedNotes', 'notes']),
    ...mapGetters(['rootPages']),
  },
  watch: {
    newNotes(v) {
      console.log(v, 'newNotes')
      this.debouncedSaveNewNotes()
    },
    changedNotes(v) {
      console.log(v, 'changedNotes')
      this.debouncedApplyNotesChanges()
    },
    removedNotes(v) {
      console.log(v, 'removedNotes')
      this.debouncedRemoveNotes()
    },
  },
  mounted() {
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      console.log('unload')
      this.saveAll()
    })
  },
  methods: {
    saveAll() {
      this.saveNewNotes()
      this.applyRemovedNotes()
      this.applyChangesInNotes()
    },
    saveNewNotes() {
      console.log('Call save new notes')
      const readyToSaveNotes = JSON.parse(JSON.stringify(this.newNotes)).filter(
        (note) => note.content && !this.savedNotes.includes(note.noteId)
      )
      if (readyToSaveNotes.length <= 0) {
        return
      }
      console.log('Save new notes', readyToSaveNotes)

      const savedNotesIds = this.newNotes
      this.savedNotes.push(...savedNotesIds.map((note) => note.noteId))
      this.$axios.post('/api/new', { notesToAdd: readyToSaveNotes })
    },
    applyRemovedNotes() {
      console.log('Call remove notes')
      if (this.removedNotes.length <= 0) {
        return
      }

      console.log('Remove notes', this.removedNotes)
      this.$axios.post('/api/remove', { notesToRemove: this.removedNotes })
      this.$store.commit('clearRemovedNotes')
    },
    applyChangesInNotes() {
      console.log('Call change notes')
      if (this.changedNotes.length <= 0) {
        return
      }

      let changedNotes = this.pageNotes.filter((note) =>
        this.changedNotes.includes(note.noteId)
      )
      const changedNewNotes = this.pageNewNotes.filter((note) =>
        this.changedNotes.includes(note.noteId)
      )
      changedNotes = changedNotes.map((note) => ({
        ...note,
        page: note.page.noteId,
      }))
      console.log('Change notes', changedNotes)
      this.$axios.post('/api/update', {
        changedNotes: [...changedNotes, ...changedNewNotes],
      })
      this.$store.commit('clearChangedNotes')
    },
  },
}
</script>

<style scoped>
.notes-layout {
  width: 100vw;
  height: 100%;
  display: flex;
  flex: 1 1 0;
}

.pages-list {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  width: 260px;
  height: 100vh;
  flex-direction: column;
  background-color: var(--gray);
  color: var(--light-gray3);
}

.notes-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--dark-gray);
}

.main-page-item-image {
  border-radius: var(--border-radius);
  margin: 0 5px 0 10px;
}
</style>
