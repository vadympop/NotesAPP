export function generateNewNoteId (state, pageNotes) {
  if (state.newNotes.length <= 0) {
    if (pageNotes.length === 0 && state.removedNotes.length === 0) {
      return 0
    }

    if (pageNotes.length === 0 && state.removedNotes.length !== 0) {
      return state.removedNotes[0]+1
    }

    if (pageNotes.length !== 0) {
      return pageNotes[pageNotes.length-1].id+1
    }
  }
  return state.newNotes[state.newNotes.length-1].id+1
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
