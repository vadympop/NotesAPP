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
    commit('setTodos', { pageId, todos: todos.filter(t => t.pageId === pageId) })
    commit('setCurrentTodos', pageId)
    commit('setCurrentPage', pageId)
  },
  removePage ({ commit }, pageId) {
    // Api request here
    commit('removePage', pageId)
  },
  createPage ({ commit, state }, name) {
    // Api request here
    const pageId = 10 // Get page id from api response
    const position = state.pages.length // Get position from api response
    commit('addPage', { pageId, name, position })
  },
  getUserPages ({ commit }) {
    const pages = [
      {
        id: '1',
        root: true,
        parent: null,
        nestedPages: ['4', '3'],
        position: 0,
        name: 'Page 1'
      },
      {
        id: '2',
        root: true,
        parent: null,
        nestedPages: [],
        position: 1,
        name: 'Page 2'
      },
      {
        id: '3',
        root: false,
        parent: '1',
        nestedPages: [],
        position: 0,
        name: 'Page 13'
      },
      {
        id: '4',
        root: false,
        parent: '1',
        nestedPages: ['5'],
        position: 1,
        name: 'Page 14'
      },
      {
        id: '5',
        root: false,
        parent: '4',
        nestedPages: [],
        position: 0,
        name: 'Page 145'
      }
    ]
    commit('addPages', pages)
  }
}
