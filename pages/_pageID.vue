<template>
<div class="page-content">
  <div class="page-todos">
    <editable ref="pageNameInput" v-model="updatedPageName" class="page-title" v-debounce="savePageEditing"/>
    <div v-for="todo of sortedTodos" :key="todo.id">
      <todo
        :content="todo.content"
        :position="todo.position"
        :styles="todo.styles"
        :author="todo.author"
        :new="todo.new"
        :todo-id="todo.id"
      />
    </div>
  </div>
  <div class="adding-todo-area" @click="addTodo"></div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "TodoPage",
  layout: 'todo',
  data: () => ({
    updatedPageName: ''
  }),
  computed: {
    sortedTodos () {
      return [...this.currentTodos, ...this.newTodos].sort((todo1, todo2) => {
        return todo1.position < todo2.position ? -1
          : todo2.position < todo1.position ? 1 : 0
      })
    },
    pageId () {
      return this.$route.params.pageID
    },
    ...mapState(['currentTodos', 'newTodos', 'currentPage'])
  },
  mounted () {
    this.$store.dispatch('getUserPages')
    this.$store.dispatch('setCurrentPage', this.pageId)
    this.updatedPageName = this.currentPage.name
    this.$refs.pageNameInput.updateText(this.updatedPageName)
  },
  methods: {
    addTodo () {
      this.$store.commit('addTodo', this.pageId)
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

.adding-todo-area {
  height: 100%;
  cursor: text;
}

</style>
