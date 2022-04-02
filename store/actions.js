export default {
  setCurrentPage ({ commit }, pageId) {
    const todos = [
      {
        id: 0,
        pageId: '1',
        position: 0,
        content: 'First page. Content in toooooodo',
        styles: {},
        author: ''
      },
      {
        id: 1,
        pageId: '1',
        position: 1,
        content: 'First page. Content in toooooodo',
        styles: {},
        author: ''
      },
      {
        id: 2,
        pageId: '1',
        position: 2,
        content: 'First page. Content in toooooodo',
        styles: {},
        author: ''
      },
      {
        id: 3,
        pageId: '1',
        position: 3,
        content: 'First page. Content in toooooodo',
        styles: {},
        author: ''
      },
      {
        id: 4,
        pageId: '2',
        position: 0,
        content: 'Second page. Content in toooooodo. Lal lalllal lal allal alalalal la',
        styles: {},
        author: ''
      },
      {
        id: 5,
        pageId: '2',
        position: 1,
        content: 'Second page. Content in toooooodo. Lal lalllal lal allal alalalal la',
        styles: {},
        author: ''
      },
      {
        id: 6,
        pageId: '2',
        position: 2,
        content: 'Second page. Content in toooooodo. Lal lalllal lal allal alalalal la',
        styles: {},
        author: ''
      },
      {
        id: 7,
        pageId: '2',
        position: 3,
        content: 'Second page. Content in toooooodo. Lal lalllal lal allal alalalal la',
        styles: {},
        author: ''
      },
      {
        id: 8,
        pageId: '2',
        position: 0,
        content: 'Second page. Content in toooooodo. Lal lalllal lal allal alalalal la',
        styles: {},
        author: ''
      },
      {
        id: 9,
        pageId: '2',
        position: 1,
        content: 'Second page. Content in toooooodo. Lal lalllal lal allal alalalal la',
        styles: {},
        author: ''
      }
    ]
    commit('addTodos', { pageId, todos: todos.filter(t => t.pageId === pageId) })
    commit('setCurrentTodos', pageId)
  }
}
