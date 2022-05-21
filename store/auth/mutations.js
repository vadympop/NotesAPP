export default {
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  updateAuth(state, data) {
    state.auth = data
  },
  setLoggedIn(state, data) {
    state.isLoggedIn = data
  },
  setAuthIsLoading(state, isLoading) {
    state.authIsLoading = isLoading
  }
}
