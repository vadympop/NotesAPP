<template>
<div class="page-content">
  <div class="page-todos">
    <span class="page-title">Todo Page Name</span>
    <div v-for="todo of pageTodos" :key="todo.id">
      <todo :content="todo.content" :position="todo.position" :styles="todo.styles" :author="todo.author"/>
    </div>
  </div>
  <div class="adding-todo-area" @click="addTodo"></div>
</div>
</template>

<script>
export default {
  name: "TodoPage",
  layout: 'todo',
  data: () => ({
    newTodos: []
  }),
  computed: {
    pageTodos () {
      return [...this.savedTodos, ...this.newTodos].sort((todo1, todo2) => {
        return todo1.position < todo2.position ? -1
          : todo2.position < todo1.position ? 1 : 0
      })
    },
    savedTodos: () => [
      { id: 0, position: 0, content: '1 Todo' },
      { id: 1, position: 1, content: '2 Todo' },
      { id: 2, position: 2, content: '3 Todo' },
    ] // Fetched from api
  },
  methods: {
    addTodo () {
      this.newTodos.push({
        id: this.pageTodos[this.pageTodos.length-1].id+1,
        position: this.pageTodos.length+1,
        content: 'gg',
        styles: {},
        author: ''
      })
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
  position: relative;
  font-weight: 550;
  z-index: 10;
}

.adding-todo-area {
  height: 100%;
  cursor: text;
}

</style>
