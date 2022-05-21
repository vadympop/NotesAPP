export default {
  async authorize({ commit, dispatch }, { email, password }) {
    const { data: newToken } = await this.$axios.post('login', {
      email,
      password
    })
    localStorage.setItem('auth', JSON.stringify(newToken.tokens))
    commit('updateAuth', newToken.tokens)
    commit('setLoggedIn', true)
    commit('setCurrentUser', newToken.user)
  },
  async register({ commit, dispatch }, { username, email, password }) {
    const { data: newToken } = await this.$axios.post('register', {
      username,
      email,
      password
    })
    localStorage.setItem('auth', JSON.stringify(newToken.tokens))
    commit('updateAuth', newToken.tokens)
    commit('setLoggedIn', true)
    commit('setCurrentUser', newToken.user)
  },
  async checkLoggedIn({ state, commit }) {
    if (!localStorage.auth || state.isLoggedIn) {
      return
    }

    commit('setAuthIsLoading', true)
    try {
      const { data: newToken } = await this.$axios.get('refresh')
      localStorage.setItem('auth', JSON.stringify(newToken.tokens))
      commit('updateAuth', newToken.tokens)
      commit('setLoggedIn', true)
      commit('setCurrentUser', newToken.user)
    } catch (error) {
      commit('updateSnackbar', {
        state: true,
        message: 'You should log in again',
        type: 'info',
        apiError: false
      })
    } finally {
      commit('setAuthIsLoading', false)
    }
  },
  async logout({ commit, state }) {
    if (state.isLoggedIn) {
      await this.$axios.post('revoke')
      commit('setLoggedIn', false)
      commit('setCurrentUser', {})
      commit('updateAuth', {})
      localStorage.removeItem('auth')
    }
  }
}
