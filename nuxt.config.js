import colors from 'vuetify/es5/util/colors'
import { API_URL } from './consts'

export default {
  head: {
    titleTemplate: '%s - todo',
    title: 'todo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/main.css'],
  plugins: ['~/plugins/axios.js'],
  components: [
    '~/components',
    '~/components/dialogs',
    '~/components/notesLayout',
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  axios: {
    baseURL: API_URL,
    credentials: true
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  build: {},
}
