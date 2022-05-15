export default {
  async getCurrentUser({ commit }) {
    const { data: currentUser } = await this.$axios.get('users/@me', {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.auth).accessToken}`,
      },
    })
    commit('setCurrentUser', currentUser)
  },
  async checkLoggedIn({ commit, dispatch, state }) {
    if (!state.isLoggedIn) {
      let auth = state.auth
      if (!auth) {
        const localAuth = localStorage.getItem('auth')
        if (localAuth) {
          commit('updateAuth', JSON.parse(localAuth))
          auth = JSON.parse(localAuth)
        }
      }

      if (auth) {
        if (auth.expiresIn <= new Date().getTime()) {
          await dispatch('refreshToken')
        }

        commit('setLoggedIn', true)
        await dispatch('getCurrentUser')
      }
    }
  },
  async authorize({ commit, dispatch }, { email, password }) {
    const { data: returnedToken } = await this.$axios.post('login', {
      email,
      password,
    })
    localStorage.setItem('auth', JSON.stringify(returnedToken))
    commit('updateAuth', returnedToken)
    commit('setLoggedIn', true)
    await dispatch('getCurrentUser')
  },
  async register({ commit, dispatch }, { username, email, password }) {
    const { data: returnedToken } = await this.$axios.post('register', {
      username,
      email,
      password,
    })
    localStorage.setItem('auth', JSON.stringify(returnedToken))
    commit('updateAuth', returnedToken)
    commit('setLoggedIn', true)
    await dispatch('getCurrentUser')
  },
  async refreshToken({ commit, dispatch }) {
    try {
      const { data: newToken } = await this.$axios.post(
        'refresh',
        {},
        {
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem('auth')).refreshToken
            }`,
          },
        }
      )
      localStorage.setItem('auth', JSON.stringify(newToken))
      commit('updateAuth', newToken)
      commit('setLoggedIn', true)
      await dispatch('getCurrentUser')
    } catch (error) {
      await dispatch('logout')
    }
  },
  async logout({ commit, dispatch, state }) {
    if (state.isLoggedIn) {
      await dispatch('revokeToken')
      commit('setLoggedIn', false)
      commit('setCurrentUser', {})
      commit('updateAuth', null)
      localStorage.removeItem('auth')
    }
  },
  async revokeToken() {
    const localAuth = JSON.parse(localStorage.getItem('auth'))
    await this.$axios.post(
      'revoke',
      {},
      {
        headers: {
          authorization: `Bearer ${localAuth.accessToken} ${localAuth.userId}`,
        },
      }
    )
  },
}