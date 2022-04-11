<template>
  <div
    :class="{'todo': true, 'todo-selected': isSelected}"
    @mouseenter="hoverableButtons = true"
    @mouseleave="hoverableButtons = false"
    @keyup.delete="removeTodo"
  >
    <div v-if="hoverableButtons" :class="{'hoverable-buttons': true}">
      <v-icon
        class="hoverable-button new-todo-button hoverable-icon"
        color="var(--todos-list)"
        @click="addTodo"
      >mdi-plus</v-icon>
      <v-icon class="hoverable-button interaction-button hoverable-icon" color="var(--todos-list)">mdi-dots-grid</v-icon>
      <div class="hoverable-button"></div>
    </div>
    <editable v-model="updatedContent" v-debounce="save" class="todo-content"/>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todoId: {
      type: Number,
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
    new: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      hoverableButtons: false,
      isSelected: false,
      updatedContent: this.content
    }
  },
  computed: {
    pageId () {
      return this.$route.params.pageID
    }
  },
  methods: {
    removeTodo () {
      if (!this.updatedContent) {
        if (!this.new) {
          this.$store.commit('removeTodo', { todoId: this.todoId, pageId: this.pageId })
        } else {
          this.$store.commit('removeNewTodo', this.todoId)
        }
      }
    },
    addTodo () {
      this.$store.commit('addTodo', this.pageId)
    },
    save () {
      const updatedData = {
        content: this.updatedContent,
        pageId: this.pageId,
        todoId: this.todoId,
        styles: this.styles,
        author: this.author,
        position: this.position
      }
      if (!this.new) {
        this.$store.commit('editTodo', updatedData)
      } else {
        this.$store.commit('editNewTodo', updatedData)
      }
    }
  }
}
</script>

<style scoped>
.todo {
  padding: 5px;
  position: relative;
  overflow: visible !important;
}

.todo ::selection {
  background-color: var(--dark-blue2);
  position: relative;
}

.todo-selected {
  background-color: var(--dark-blue);
}

.todo-content {
  font-size: 1.05em;
  font-weight: 450;
  color: #ffffff;
  width: 100%;
  word-break: break-word;
}

.todo-content:focus {
  outline: none;
}

.hoverable-button {
  position: absolute;
  top: 3px;
}

.new-todo-button {
  left: -60px;
}

.interaction-button {
  left: -30px;
}
</style>
