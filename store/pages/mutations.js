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
    const foundPage = state.pages.find((page) => page._id === pageId)
    if (foundPage.nestedPages.length === 0) {
      state.pages.splice(state.pages.indexOf(foundPage), 1)

      if (state.changedPages.includes(pageId)) {
        state.changedPages.splice(state.changedPages.indexOf(pageId), 1)
      }
    } else {
      const deletePagesNestedPagesIds = findAllNestedPages(
        state.pages,
        foundPage
      )
      deletePagesNestedPagesIds.push(pageId)
      deletePagesNestedPagesIds.forEach((nestedPageId) => {
        state.pages.splice(
          state.pages.indexOf(
            state.pages.find((page) => page._id === nestedPageId)
          ),
          1
        )

        if (state.changedPages.includes(nestedPageId)) {
          state.changedPages.splice(state.changedPages.indexOf(nestedPageId), 1)
        }
      })
    }
  },
  editPage(state, { pageId, root, nestedPages, parent, position, name }) {
    const foundPage = state.pages.find((page) => page._id === pageId)
    state.pages[state.pages.indexOf(foundPage)] = {
      _id: pageId,
      root,
      nestedPages,
      parent,
      position,
      name
    }

    if (!state.changedPages.includes(pageId)) {
      state.changedPages.push(pageId)
    }
  }
}
