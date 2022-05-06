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

export default {
  name: 'NotesLayout',
  data: () => ({
    timer: null,
    savedNotes: [],
  }),
  computed: {
    pageNotes() {
      return this.notes[this.pageId]
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
      this.debounce(this.saveNewNotes)
    },
    changedNotes(v) {
      console.log(v, 'changedNotes')
      this.debounce(this.applyChangesInNotes)
    },
    removedNotes(v) {
      console.log(v, 'removedNotes')
      this.debounce(this.applyRemovedNotes)
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
    debounce(callback) {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        callback()
      }, 5000)
    },
    saveAll() {
      this.saveNewNotes()
      this.applyRemovedNotes()
      this.applyChangesInNotes()
    },
    saveNewNotes() {
      const readyToSaveNotes = JSON.parse(JSON.stringify(this.newNotes)).filter(
        (note) => note.content && !this.savedNotes.includes(note._id)
      )
      readyToSaveNotes.map((note) => {
        delete note._id
        return note
      })

      const savedNotesIds = this.newNotes
      this.savedNotes.push(...savedNotesIds.map((note) => note._id))
      this.$axios.post('/api/new', { notesToAdd: readyToSaveNotes })
    },
    applyRemovedNotes() {
      if (this.removedNotes.length <= 0) {
        return
      }

      this.$axios.post('/api/remove', { notesToRemove: this.removedNotes })
      this.$store.commit('clearRemovedNotes')
    },
    applyChangesInNotes() {
      if (this.changedNotes.length <= 0) {
        return
      }

      const changedNotes = this.pageNotes.filter((note) =>
        this.changedNotes.includes(note._id)
      )
      this.$axios.post('/api/update', {
        changedNotes: changedNotes.map((note) => ({
          ...note,
          page: note.page._id,
        })),
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
