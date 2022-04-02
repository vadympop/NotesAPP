import Vue from 'vue'
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)

Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
  defaultTime: '2000ms'
})
