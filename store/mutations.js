import {findAllNestedPages, generateNewNoteId} from "~/utils";

export default {
  addNote (state, pageId) {
    const pageNotes = state.notes[pageId]
    state.newNotes.push({
      id: generateNewNoteId(state, pageNotes),
      pageId,
      position: pageNotes.length,
      content: null,
      styles: {},
      author: '',
      new: true
    })
  },
  setCurrentPage(state, pageId) {
    state.currentPage = state.pages.find(page => page.id === pageId)
  },
  setNotes (state, { pageId, notes }) {
    state.notes[pageId] = notes
  },
  setCurrentNotes (state, pageId) {
    state.currentNotes = state.notes[pageId]
  },
  editNote (state, { pageId, noteId, styles, author, content, position }) {
    if (state.removedNotes.includes(noteId)) {
      return
    }

    const foundNote = state.notes[pageId].find(note => note.id === noteId)
    state.notes[pageId][state.notes[pageId].indexOf(foundNote)] = {
      id: noteId, pageId, styles, author, content, position
    }

    if (!state.changedNotes.includes(noteId)) {
      state.changedNotes.push(noteId)
    }
  },
  editNewNote (state, { pageId, noteId, styles, author, content, position }) {
    const foundNote = state.newNotes.find(note => note.id === noteId)
    state.newNotes[state.newNotes.indexOf(foundNote)] = {
      id: noteId, pageId, styles, author, content, position, new: true
    }
  },
  removeNote (state, { pageId, noteId }) {
    const foundNote = state.notes[pageId].find(note => note.id === noteId)
    state.notes[pageId].splice(state.notes[pageId].indexOf(foundNote), 1)
    state.removedNotes.push(noteId)

    if (state.changedNotes.includes(noteId)) {
      state.changedNotes.splice(state.changedNotes.indexOf(noteId), 1)
    }
  },
  removeNewNote (state, noteId) {
    const foundNote = state.newNotes.find(note => note.id === noteId)
    state.newNotes.splice(state.newNotes.indexOf(foundNote), 1)
  },
  addPages (state, pages) {
    state.pages = pages
  },
  addPage (state, { pageId, name, position }) {
    state.pages.push({
      id: pageId,
      root: true,
      parent: null,
      nestedPages: [],
      position,
      name
    })
  },
  removePage (state, pageId) {
    const foundPage = state.pages.find(page => page.id === pageId)
    if (foundPage.nestedPages.length === 0) {
      state.pages.splice(state.pages.indexOf(foundPage), 1)

      if (state.changedPages.includes(pageId)) {
        state.changedPages.splice(state.changedPages.indexOf(pageId), 1)
      }
    } else {
      const deletePagesNestedPagesIds = findAllNestedPages(state.pages, foundPage)
      deletePagesNestedPagesIds.push(pageId)
      deletePagesNestedPagesIds.forEach(nestedPageId => {
        state.pages.splice(state.pages.indexOf(state.pages.find(page => page.id === nestedPageId)), 1)

        if (state.changedPages.includes(nestedPageId)) {
          state.changedPages.splice(state.changedPages.indexOf(nestedPageId), 1)
        }
      })
    }
  },
  editPage (state, { pageId, root, nestedPages, parent, position, name }) {
    const foundPage = state.pages.find(page => page.id === pageId)
    state.pages[state.pages.indexOf(foundPage)] = {
      id: pageId, root, nestedPages, parent, position, name
    }

    if (!state.changedPages.includes(pageId)) {
      state.changedPages.push(pageId)
    }
  }
}
