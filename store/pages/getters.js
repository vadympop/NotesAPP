export default {
  rootPages: (state) => state.pages.filter((page) => page.root),
  notRootPages: (state) => state.pages.filter((page) => !page.root),
}
