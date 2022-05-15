import { v4 as uuid4 } from 'uuid'

export default {
  addNote(state, pageId) {
    const noteId = uuid4()
    state.newNotes.push(noteId)
    state.notes[pageId].push({
      noteId,
      page: pageId,
      position: state.notes[pageId].length,
      content: null,
      styles: { someV: 'someV' },
      author: 'a',
      newNote: true,
    })
  },
  setNotes(state, { pageId, notes }) {
    state.notes[pageId] = notes
  },
  clearRemovedNotes(state) {
    state.removedNotes = []
  },
  clearChangedNotes(state) {
    state.changedNotes = []
  },
  setCurrentNotes(state, pageId) {
    state.currentNotes = state.notes[pageId]
  },
  editNote(
    state,
    { page, noteId, styles, author, content, position, newNote, preventApiReq }
  ) {
    if (state.removedNotes.includes(noteId)) {
      return
    }

    const foundNote = state.notes[page].find((note) => note.noteId === noteId)
    state.notes[page][state.notes[page].indexOf(foundNote)] = {
      noteId,
      page,
      styles,
      author,
      content,
      position,
      newNote,
    }

    if (!state.changedNotes.includes(noteId) && !preventApiReq) {
      state.changedNotes.push(noteId)
    }
  },
  removeNote(state, { pageId, noteId }) {
    const foundNote = state.notes[pageId].find((note) => note.noteId === noteId)
    state.notes[pageId]
      .filter((note) => note.position > foundNote.position)
      .forEach((note) => {
        state.notes[pageId][state.notes[pageId].indexOf(note)] = {
          ...note,
          position: note.position - 1,
        }
        if (!state.changedNotes.includes(note.noteId)) {
          state.changedNotes.push(note.noteId)
        }
      })

    state.notes[pageId].splice(state.notes[pageId].indexOf(foundNote), 1)
    state.removedNotes.push(noteId)

    if (state.changedNotes.includes(noteId)) {
      state.changedNotes.splice(state.changedNotes.indexOf(noteId), 1)
    }
  },
}
