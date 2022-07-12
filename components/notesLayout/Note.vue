<template>
  <div
    :class="{ note: true, 'note-selected': isSelected }"
    @mouseenter="hoverableButtons = true"
    @mouseleave="hoverableButtons = false"
    @keyup.delete="removeNote"
  >
    <div v-if="hoverableButtons" :class="{ 'hoverable-buttons': true }">
      <v-icon
        class="hoverable-button new-note-button hoverable-icon"
        color="var(--light-gray3)"
        @click="addNote"
        >mdi-plus</v-icon
      >
      <v-icon
        class="hoverable-button interaction-button hoverable-icon"
        color="var(--light-gray3)"
        >mdi-dots-grid</v-icon
      >
      <div class="hoverable-button"></div>
    </div>
    <editable
      ref="noteContent"
      v-model="updatedContent"
      class="note-content"
      @input="debouncedSave"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'NoteItem',
  props: {
    noteId: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    position: {
      type: Number,
      required: true
    },
    styles: {
      type: Object,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    newNote: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      hoverableButtons: false,
      isSelected: false,
      updatedContent: this.content,
      debouncedSave: debounce(this.save, 1000)
    }
  },
  computed: {
    pageId() {
      return this.$route.params.pageID
    },
    ...mapState('notes', ['currentNotes']),
    ...mapState('auth', ['currentUser'])
  },
  methods: {
    focus() {
      this.$refs.noteContent.focus()
    },
    removeNote() {
      if (!this.updatedContent) {
        this.$emit('remove-note', { noteId: this.noteId })
        this.$store.commit('notes/removeNote', {
          noteId: this.noteId,
          pageId: this.pageId
        })
      }
    },
    addNote() {
      this.$store.commit('notes/addNote', { pageId: this.pageId, author: this.currentUser.userId })
      setTimeout(() => {
        this.$parent.$refs[
          this.currentNotes[this.currentNotes.length - 1]?.noteId
        ][0]?.focus()
      }, 100)
    },
    save() {
      this.$store.commit('notes/editNote', {
        page: this.page,
        noteId: this.noteId,
        author: this.author,
        updated: {
          content: this.updatedContent,
          styles: this.styles,
          position: this.position,
        }
      })
    }
  }
}
</script>

<style scoped>
.note {
  padding: 5px;
  position: relative;
  overflow: visible !important;
}

.note-selected {
  background-color: var(--dark-blue);
}

.note-content {
  font-size: 1.05em;
  font-weight: 450;
  color: #ffffff;
  width: 100%;
  word-break: break-word;
}

.note-content:focus {
  outline: none;
}

.hoverable-button {
  position: absolute;
  top: 3px;
}

.new-note-button {
  left: -60px;
}

.interaction-button {
  left: -30px;
}
</style>
