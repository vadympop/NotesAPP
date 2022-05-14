<template>
  <div>
    <v-snackbar
      v-model="snackbarState"
      multi-line
      :timeout="snackbar.timeout"
      bottom
      :color="snackbar.type"
    >
      <div class="d-flex align-center">
        <v-icon large class="pa-2">{{ icon }}</v-icon>

        <v-layout column>
          <span><strong>{{title}}</strong></span>
          <span>{{ snackbar.message }}</span>
        </v-layout>

        <v-spacer></v-spacer>

        <v-btn
          fab
          text
          small
          @click="snackbarState = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GlobalSnackbar',
  data () {
    return {
      typeToIcon: {
        success: 'mdi-check-circle-outline',
        warning: 'mdi-alert-circle-outline',
        error: 'mdi-close',
        info: 'mdi-information-outline'
      },
      snackbarTypeToTitle: {
        success: 'Успех',
        warning: 'Предупреждение',
        error: 'Ошибка',
        info: 'Информация'
      }
    }
  },
  computed: {
    icon () {
      return this.typeToIcon[this.snackbar.type]
    },
    title () {
      return this.snackbarTypeToTitle[this.snackbar.type]
    },
    snackbarState: {
      get () {
        return this.snackbar.state
      },
      set (state) {
        this.$store.commit('updateSnackbar', { state })
      }
    },
    ...mapState(['snackbar'])
  }
}
</script>

<style scoped>
</style>