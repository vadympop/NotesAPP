<template>
  <v-app dark style="overflow: hidden; height: 100vh">
    <v-main>
      <user-not-activated-blank
        v-if="!currentUser.isActivated && isLoggedIn && !authIsLoading"
      />
      <div class="notes-layout">
        <div class="pages-list">
          <nuxt-link to="/" class="additional-page-item">
            <img
              src="https://via.placeholder.com/128x128"
              alt="avatar"
              class="main-page-item-image"
              width="48"
            />
            <span class="additional-page-item-text">{{
              currentUser.username
            }}</span>
          </nuxt-link>

          <v-divider></v-divider>

          <div v-if="favouritePages.length > 0" class="mt-10">
            <span class="favourite-pages-title">Favourite pages</span>
            <page-item
              v-for="page of favouritePages"
              :key="page._id"
              :page-id="page._id"
              :name="page.name"
              :position="page.position"
              :nested-pages="page.nestedPages"
              :parent="page.parent"
              :root="page.root"
            />
            <v-divider class="mt-10"></v-divider>
          </div>

          <div class="mt-10">
            <div v-if="rootPages.length > 0">
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
            <nothing-to-show v-else />
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
    <global-snackbar />
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'NotesLayout',
  data() {
    return {
      debouncedSaveNewNotes: debounce(this.saveNewNotes),
      debouncedRemoveNotes: debounce(this.applyRemovedNotes),
      debouncedApplyNotesChanges: debounce(this.applyChangesInNotes)
    }
  },
  computed: {
    pageId() {
      return this.$route.params.pageID
    },
    favouritePages() {
      return this.rootPages.filter((page) => page.favourite)
    },
    ...mapState('notes', [
      'removedNotes',
      'changedNotes',
      'currentNotes',
      'newNotes'
    ]),
    ...mapState('auth', ['currentUser', 'isLoggedIn', 'authIsLoading']),
    ...mapGetters('pages', ['rootPages'])
  },
  watch: {
    newNotes() {
      this.debouncedSaveNewNotes()
    },
    changedNotes() {
      this.debouncedApplyNotesChanges()
    },
    removedNotes() {
      this.debouncedRemoveNotes()
    }
  },
  mounted() {
    this.$store.dispatch('auth/checkLoggedIn')
    this.$store.dispatch('pages/getTrash')
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener(
      'beforeunload',
      (e) => {
        e.preventDefault()
        console.log('unload')
        this.saveAll()
        e.returnValue = 'a'
      },
      { capture: true }
    )
  },
  methods: {
    ...mapMutations('notes', [
      'clearChangedNotes',
      'clearRemovedNotes',
      'removeFromChangedNotes'
    ]),
    ...mapActions('notes', ['clearNewNotes']),
    saveAll() {
      this.saveNewNotes()
      this.applyRemovedNotes()
      this.applyChangesInNotes()
    },
    saveNewNotes() {
      console.log('Call save new notes')
      const readyToSaveNotes = this.currentNotes.filter(
        (note) => note.newNote && note.content
      )
      if (readyToSaveNotes.length <= 0) {
        return
      }
      console.log('Save new notes', readyToSaveNotes)

      this.$axios.post(
        'notes/new',
        { notesToAdd: readyToSaveNotes },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`
          }
        }
      )
      this.clearNewNotes()
    },
    applyRemovedNotes() {
      console.log('Call remove notes')
      if (this.removedNotes.length <= 0) {
        return
      }

      console.log('Remove notes', this.removedNotes)
      this.$axios.post(
        'notes/remove',
        { notesToRemove: this.removedNotes },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`
          }
        }
      )
      this.clearRemovedNotes()
    },
    applyChangesInNotes() {
      console.log('Call change notes')
      if (this.changedNotes.length <= 0) {
        return
      }

      let changedNotes = this.currentNotes.filter((note) =>
        this.changedNotes.includes(note.noteId)
      )
      const newNotesInChangedNotes = changedNotes.filter((note) => note.newNote)
      if (newNotesInChangedNotes.length > 0) {
        this.saveNewNotes()
        this.removeFromChangedNotes(
          ...newNotesInChangedNotes.map((note) => note.noteId)
        )
        changedNotes = changedNotes.filter((note) => !note.newNote)
      }
      if (changedNotes.length <= 0) {
        return
      }

      console.log('Change notes', changedNotes)
      this.$axios.post(
        'notes/update',
        {
          changedNotes
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`
          }
        }
      )
      this.clearChangedNotes()
    }
  }
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

.favourite-pages-title {
  padding: 0 25px;
  text-transform: uppercase;
}
</style>
