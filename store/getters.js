export default {
  newTodos: (state) => state.newTodos,
  changedTodos: (state) => state.changedTodos,
  removedTodos: (state) => state.removedTodos,
  todos: (state) => state.todos,
  pages: (state) => state.pages,
  rootPages: (state) => state.pages.filter(page => page.root),
  notRootPages: (state) => state.pages.filter(page => !page.root),
  currentTodos: (state) => state.currentTodos
}
