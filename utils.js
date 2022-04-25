export function generateNewTodoId (state, pageTodos) {
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

export function findAllNestedPages (pages, page) {
  const foundIds = []
  for (let i = 0; i < page.nestedPages.length; i++) {
    const nestedPageId = page.nestedPages[i]
    const nestedPage = pages.find(page => page.id === nestedPageId)
    if (nestedPage.nestedPages.length > 0) {
      foundIds.push(...findAllNestedPages(pages, nestedPage))
    }

    foundIds.push(nestedPageId)
  }
  return foundIds
}
