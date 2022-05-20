import * as axiosLib from 'axios'
import { API_URL } from '@/consts'

export default function ({ $axios, store, redirect }) {
  $axios.onResponseError(async (error) => {
    store.commit('updateSnackbar', {
      state: true,
      message: error.response?.data?.message,
      type: 'error',
      data: error.response?.data,
      apiError: true,
      code: error.response?.status
    })

    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const { data: newToken } = await axiosLib.get(`${API_URL}refresh`, { withCredentials: true })
        localStorage.setItem('auth', JSON.stringify(newToken.tokens))
        store.commit('auth/updateAuth', newToken.tokens)
        store.commit('auth/setLoggedIn', true)
        store.commit('auth/setCurrentUser', newToken.user)

        return $axios.request(originalRequest)
      } catch (e) {
        store.commit('updateSnackbar', {
          state: true,
          message: 'You should log in again',
          type: 'info',
          apiError: false
        })
        redirect('/')
      }
    }
    throw error;
  })

  $axios.onRequest(config => {
    if(localStorage.auth) {
      const accessToken = JSON.parse(localStorage.auth).accessToken
      if(!config.headers.authorization && accessToken) {
        config.headers.authorization = `Bearer ${JSON.parse(localStorage.auth).accessToken}`
      }
    }

    return config
  })
}