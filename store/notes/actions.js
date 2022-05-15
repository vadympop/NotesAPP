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
  async getNotes({ rootState, state, commit }, pageId) {
    if ((state.notes[pageId]?.length || 0) <= 0) {
      const notesResponse = await this.$axios.get(`notes/${pageId}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`,
        },
      })
      commit('setNotes', { pageId, notes: notesResponse.data })
    }
    commit('setCurrentNotes', pageId)
  }
}