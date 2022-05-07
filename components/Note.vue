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
      @input="debouncedSave"
      class="note-content"
    />
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  name: 'NoteItem',
  props: {
    noteId: {
      type: String,
      required: true,
    },
    page: {
      type: [Object, String],
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    position: {
      type: Number,
      required: true,
    },
    styles: {
      type: Object,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    new: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      hoverableButtons: false,
      isSelected: false,
      updatedContent: this.content,
      debouncedSave: debounce(this.save, 500)
    }
  },
  computed: {
    pageId() {
      return this.$route.params.pageID
    },
  },
  methods: {
    focus() {
      this.$refs.noteContent.focus()
    },
    removeNote() {
      if (!this.updatedContent) {
        this.$emit('remove-note', { noteId: this.noteId })
        if (!this.new) {
          this.$store.commit('removeNote', {
            noteId: this.noteId,
            pageId: this.pageId,
          })
        } else {
          this.$store.commit('removeNewNote', this.noteId)
        }
      }
    },
    addNote() {
      this.$store.commit('addNote', this.pageId)
    },
    save() {
      const updatedData = {
        content: this.updatedContent,
        page: this.page,
        noteId: this.noteId,
        styles: this.styles,
        author: this.author,
        position: this.position,
      }
      if (!this.new) {
        this.$store.commit('editNote', updatedData)
      } else {
        this.$store.commit('editNewNote', updatedData)
      }
    },
  },
}
</script>

<style scoped>
.note {
  padding: 5px;
  position: relative;
  overflow: visible !important;
}

.note ::selection {
  background-color: var(--dark-blue2);
  position: relative;
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
