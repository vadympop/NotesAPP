export default {
  rootPages: (state) =>
    state.pages.filter((page) => page.root && !page.deleted),
  notRootPages: (state) =>
    state.pages.filter((page) => !page.root && !page.deleted)
}
