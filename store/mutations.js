import generateNewTodoId from "~/heplers/generateNewTodoId";

export default {
  addTodo (state, pageId) {
    const pageTodos = state.todos[pageId]
    state.newTodos.push({
      id: generateNewTodoId(state, pageTodos),
      pageId,
      position: pageTodos.length+1,
      content: null,
      styles: {},
      author: '',
      new: true
    })
  },
  addTodos (state, { pageId, todos }) {
    if (!state.todos[pageId]) {
      state.todos[pageId] = todos
    } else {
      state.todos[pageId].push(...todos)
    }
  },
  setCurrentTodos (state, pageId) {
    state.currentTodos = state.todos[pageId]
  },
  editTodo (state, { pageId, todoId, styles, author, content, position }) {
    if (state.removedTodos.includes(todoId)) {
      return
    }

    const foundTodo = state.todos[pageId].find(todo => todo.id === todoId)
    state.todos[pageId][state.todos[pageId].indexOf(foundTodo)] = {
      id: todoId, pageId, styles, author, content, position
    }

    if (!state.changedTodos.includes(todoId)) {
      state.changedTodos.push(todoId)
    }
  },
  editNewTodo (state, { pageId, todoId, styles, author, content, position }) {
    const foundTodo = state.newTodos.find(todo => todo.id === todoId)
    state.newTodos[state.newTodos.indexOf(foundTodo)] = {
      id: todoId, pageId, styles, author, content, position, new: true
    }
  },
  removeTodo (state, { pageId, todoId }) {
    const foundTodo = state.todos[pageId].find(todo => todo.id === todoId)
    state.todos[pageId].splice(state.todos[pageId].indexOf(foundTodo), 1)
    state.removedTodos.push(todoId)

    if (state.changedTodos.includes(todoId)) {
      state.changedTodos.splice(state.changedTodos.indexOf(todoId), 1)
    }
  },
  removeNewTodo (state, todoId) {
    const foundTodo = state.newTodos.find(todo => todo.id === todoId)
    state.newTodos.splice(state.newTodos.indexOf(foundTodo), 1)
  },
  addPages (state, pages) {
    state.pages = pages
  },
  addPage (state, page) {
    state.pages.push(page)
  },
  removePage (state, pageId) {
    const foundPage = state.pages.find(page => page.id === pageId)
    state.pages.splice(state.pages.indexOf(foundPage), 1)
  },
  editPage (state, { pageId, root, nestedPages, parent, position, name }) {
    const foundPage = state.pages.find(page => page.id === pageId)
    state.pages[state.pages.indexOf(foundPage)] = {
      id: pageId, root, nestedPages, parent, position, name
    }
  }
}
