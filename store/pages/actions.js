export default {
  async setCurrentPage({ state, commit, dispatch }, pageId) {
    if (state.currentPage._id === pageId) {
      return
    }

    await dispatch('getUserPages')
    commit('setCurrentPage', pageId)
  },
  async removePage({ commit }, pageId) {
    await this.$axios.delete(`pages/${pageId}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`,
      },
    })
    commit('removePage', pageId)
  },
  async createPage({ commit, state }, name) {
    const newPageResponse = await this.$axios.post(
      'pages',
      { name },
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`,
        },
      }
    )
    const pageId = newPageResponse.data._id
    const position = newPageResponse.data.position
    commit('addPage', { pageId, name, position })
  },
  async getUserPages({ state, commit }) {
    if (state.pages.length > 0) {
      return
    }

    const pagesResponse = await this.$axios.get('pages', {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`,
      },
    })
    commit('addPages', pagesResponse.data)
  },
}
