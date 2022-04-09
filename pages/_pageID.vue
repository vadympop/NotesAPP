<template>
<div class="page-content">
  <div class="page-todos">
    <editable v-model="pageTitle" class="page-title"/>
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
import { mapGetters } from 'vuex'

export default {
  name: "TodoPage",
  layout: 'todo',
  data: () => ({
    pageTitle: 'Todo Page Title'
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
    ...mapGetters(['currentTodos', 'newTodos'])
  },
  mounted () {
    this.$store.dispatch('setCurrentPage', this.pageId)
  },
  methods: {
    addTodo () {
      this.$store.commit('addTodo', this.pageId)
    }
  }
}
</script>

<style scoped>
.page-content {
  padding: 8em;
  height: 100%;
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
