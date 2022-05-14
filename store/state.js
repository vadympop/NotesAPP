export default () => ({
  newNotes: [],
  notes: {},
  changedNotes: [],
  changedPages: [],
  removedNotes: [],
  currentNotes: [],
  pages: [],
  currentPage: {},
  currentAuth: {},
  currentUser: {},
  isLoggedIn: false,
  snackbar: {
    state: false,
    message: null,
    type: 'success',
    data: {},
    apiError: false,
    code: 0,
    timeout: 4000
  }
})
