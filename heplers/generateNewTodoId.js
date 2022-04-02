export default (state, pageTodos) => {
  if (state.newTodos.length <= 0) {
    if (pageTodos.length === 0 && state.removedTodos.length === 0) {
      return 0
    }

    if (pageTodos.length === 0 && state.removedTodos.length !== 0) {
      return state.removedTodos[0]+1
    }

    if (pageTodos.length !== 0) {
      return pageTodos[pageTodos.length-1].id+1
    }
  }
  return state.newTodos[state.newTodos.length-1].id+1
}
