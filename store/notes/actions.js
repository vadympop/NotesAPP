export default {
  clearNewNotes({ state, commit }) {
    state.currentNotes
      .filter((note) => note.newNote)
      .forEach((note) => {
        commit('editNote', {
          page: note.page,
          author: note.author,
          noteId: note.noteId,
          updated: { newNote: false }
        })
      })
  },
  async getNotes({ rootState, state, commit }, pageId) {
    commit('setCurrentNotes', null)
    if ((state.notes[pageId]?.length || 0) <= 0) {
      const notesResponse = await this.$axios.get(`notes/${pageId}`)
      commit('setNotes', { pageId, notes: notesResponse.data })
    }
    commit('setCurrentNotes', pageId)
  }
}
