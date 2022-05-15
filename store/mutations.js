export default {
  updateSnackbar(state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      state.snackbar[key] = value
    }
  }
}
