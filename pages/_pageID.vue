<template>
<div class="page-content">
  <div class="page-notes">
    <editable ref="pageNameInput" v-model="updatedPageName" class="page-title" v-debounce="savePageEditing"/>
    <div v-for="note of sortedNotes" :key="note._id">
      <note
        :content="note.content"
        :position="note.position"
        :styles="note.styles"
        :author="note.author"
        :new="note.new"
        :note-id="note._id"
      />
    </div>
  </div>
  <div class="adding-notes-area" @click="addNote"></div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "NotesPage",
  layout: 'notes',
  data: () => ({
    updatedPageName: ''
  }),
  computed: {
    sortedNotes () {
      if (!this.currentNotes || !this.newNotes) {
        return []
      }

      return [...this.currentNotes, ...this.newNotes].sort(
        (note1, note2) => note1.position-note2.position
      )
    },
    pageId () {
      return this.$route.params.pageID
    },
    ...mapState(['currentNotes', 'newNotes', 'currentPage'])
  },
  watch: {
    currentPage (){
      if (!this.updatedPageName) {
        this.updatedPageName = this.currentPage.name
        this.$refs.pageNameInput.updateText(this.updatedPageName)
      }
    }
  },
  mounted () {
    this.$store.dispatch('getUserPages')
    this.$store.dispatch('setCurrentPage', this.pageId)
  },
  methods: {
    addNote () {
      this.$store.commit('addNote', this.pageId)
    },
    savePageEditing () {
      const updatedData = {
        pageId: this.pageId,
        name: this.updatedPageName,
        root: this.currentPage.root,
        nestedPages: this.currentPage.nestedPages,
        parent: this.currentPage.parent,
        position: this.currentPage.position
      }

      this.$store.commit('editPage', updatedData)
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

.page-title:focus-visible{
  outline: none;
}

.adding-notes-area {
  height: 100%;
  cursor: text;
}

</style>
