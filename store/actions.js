export default {
  clearNewNotes({ state, commit }) {
    state.currentNotes
      .filter((note) => note.newNote)
      .forEach((note) => {
        commit('editNote', {
          ...note,
          newNote: false,
          preventApiReq: true,
        })
      })
  },
  async setCurrentPage({ state, commit }, pageId) {
    if (state.currentPage._id === pageId) {
      return
    }

    if ((state.notes[pageId]?.length || 0) <= 0) {
      const notesResponse = await this.$axios.get('api/notes', {
        params: { filter: `page=${pageId}` },
      })
      commit('setNotes', { pageId, notes: notesResponse.data.items })
    }

    commit('setCurrentNotes', pageId)
    commit('setCurrentPage', pageId)
  },
  async removePage({ commit }, pageId) {
    await this.$axios.delete(`api/pages/${pageId}`)
    commit('removePage', pageId)
  },
  async createPage({ commit, state }, name) {
    const newPageResponse = await this.$axios.post('api/pages', { name })
    const pageId = newPageResponse.data._id
    const position = newPageResponse.data.position
    commit('addPage', { pageId, name, position })
  },
  async getUserPages({ state, commit }) {
    // const pages = [
    //   {
    //     id: '1',
    //     root: true,
    //     parent: null,
    //     nestedPages: ['4', '3'],
    //     position: 0,
    //     name: 'Page 1'
    //   },
    //   {
    //     id: '2',
    //     root: true,
    //     parent: null,
    //     nestedPages: [],
    //     position: 1,
    //     name: 'Page 2'
    //   },
    //   {
    //     id: '3',
    //     root: false,
    //     parent: '1',
    //     nestedPages: [],
    //     position: 0,
    //     name: 'Page 13'
    //   },
    //   {
    //     id: '4',
    //     root: false,
    //     parent: '1',
    //     nestedPages: ['5'],
    //     position: 1,
    //     name: 'Page 14'
    //   },
    //   {
    //     id: '5',
    //     root: false,
    //     parent: '4',
    //     nestedPages: [],
    //     position: 0,
    //     name: 'Page 145'
    //   }
    // ]
    if (state.pages.length > 0) {
      return
    }

    const pagesResponse = await this.$axios.get('api/pages')
    commit('addPages', pagesResponse.data.items)
  },
}
