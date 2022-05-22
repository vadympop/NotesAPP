import { findAllNestedPages } from '@/utils'

export default {
  setCurrentPage(state, pageId) {
    state.currentPage = state.pages.find((page) => page._id === pageId) || {}
  },
  addPages(state, pages) {
    state.pages = pages
  },
  addPage(state, { pageId, name, position }) {
    state.pages.push({
      _id: pageId,
      root: true,
      parent: null,
      nestedPages: [],
      position,
      name
    })
  },
  removePage(state, pageId) {
    const pageInTrash = state.trash.find((page) => page._id === pageId)
    if (!pageInTrash) {
      return
    }

    state.trash.splice(state.trash.indexOf(pageInTrash), 1)
  },
  movePageToTrash(state, pageId) {
    const foundPage = state.pages.find((page) => page._id === pageId)
    if (foundPage.nestedPages.length === 0) {
      state.pages.splice(state.pages.indexOf(foundPage), 1)

      if (state.changedPages.includes(pageId)) {
        state.changedPages.splice(state.changedPages.indexOf(pageId), 1)
      }

      if (!state.trash.find((page) => page._id === pageId)) {
        state.trash.push(foundPage)
      }
    } else {
      const deletePagesNestedPagesIds = findAllNestedPages(
        state.pages,
        foundPage
      )
      deletePagesNestedPagesIds.push(pageId)
      deletePagesNestedPagesIds.forEach((nestedPageId) => {
        const nestedPage = state.pages.find((page) => page._id === nestedPageId)
        state.pages.splice(state.pages.indexOf(nestedPage), 1)

        if (state.changedPages.includes(nestedPageId)) {
          state.changedPages.splice(state.changedPages.indexOf(nestedPageId), 1)
        }

        if (!state.trash.find((page) => page._id === nestedPageId)) {
          state.trash.push(nestedPage)
        }
      })
    }
  },
  restorePageFromTrash(state, pageId) {
    const pageInTrash = state.trash.find((page) => page._id === pageId)
    if (!pageInTrash) {
      return
    }

    state.trash.splice(state.trash.indexOf(pageInTrash), 1)
    state.pages.push({ ...pageInTrash, deleted: false })
  },
  clearTrash(state) {
    state.trash = []
  },
  setTrash(state, trash) {
    state.trash = trash
  },
  editPage(state, { pageId, updated }) {
    if (state.currentPage._id === pageId) {
      state.currentPage = { ...state.currentPage, ...updated }
    }

    const foundPage = state.pages.find((page) => page._id === pageId)
    state.pages[state.pages.indexOf(foundPage)] = { ...foundPage, ...updated }

    if (!state.changedPages.includes(pageId)) {
      state.changedPages.push(pageId)
    }
  }
}
