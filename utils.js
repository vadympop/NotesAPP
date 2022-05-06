export function findAllNestedPages (pages, page) {
  const foundIds = []
  for (let i = 0; i < page.nestedPages.length; i++) {
    const nestedPageId = page.nestedPages[i]
    const nestedPage = pages.find(page => page._id === nestedPageId)
    if (nestedPage.nestedPages.length > 0) {
      foundIds.push(...findAllNestedPages(pages, nestedPage))
    }

    foundIds.push(nestedPageId)
  }
  return foundIds
}
