export default {
  async setCurrentPage({ state, commit, dispatch }, pageId) {
    if (state.currentPage._id === pageId) {
      return
    }

    await dispatch('getUserPages')
    commit('setCurrentPage', pageId)
  },
  async removePage({ state, commit }, pageId) {
    if (!state.trash.find((page) => page._id === pageId)) {
      return
    }

    await this.$axios.delete(`pages/${pageId}`)
    commit('removePage', pageId)
  },
  async restorePageFromTrash({ state, commit }, pageId) {
    if (!state.trash.find((page) => page._id === pageId)) {
      return
    }

    await this.$axios.post(`pages/trash/${pageId}/restore`)
    commit('restorePageFromTrash', pageId)
  },
  async clearTrash({ state, commit }) {
    if (state.trash.length <= 0) {
      return
    }

    await this.$axios.delete('pages/trash')
    commit('clearTrash')
  },
  async movePageToTrash({ commit }, pageId) {
    await this.$axios.post(`pages/trash/${pageId}`)
    commit('movePageToTrash', pageId)
  },
  async getTrash({ commit }) {
    const { data: trash } = await this.$axios.get('pages/trash')
    commit('setTrash', trash)
  },
  async createPage({ commit, state }, name) {
    const newPageResponse = await this.$axios.post('pages', { name })
    const pageId = newPageResponse.data._id
    const position = newPageResponse.data.position
    commit('addPage', { pageId, name, position })
  },
  async getUserPages({ state, commit }) {
    if (state.pages.length > 0) {
      return
    }

    const pagesResponse = await this.$axios.get('pages')
    commit('addPages', pagesResponse.data)
  },
  async editPage({ commit }, { pageId, updated }) {
    await this.$axios.put(`pages/${pageId}`, { newPage: updated })
    commit('editPage', { pageId, updated })
  }
}
