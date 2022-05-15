<template>
  <div style="position:relative;">
    <input
      :value="value"
      :type="inputType"
      class="input mt-2"
      :placeholder="placeholder"
      v-on="listeners"
    />
    <v-icon
      :class="{'password-input-eye': true, 'password-input-eye-clicked': eyeClicked}"
      @click="changeInputType"
    >mdi-eye</v-icon>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    eyeClicked: false,
    inputType: 'password'
  }),
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput }
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    changeInputType () {
      this.eyeClicked = !this.eyeClicked
      this.inputType = this.eyeClicked ? 'text' : 'password'
    }
  }
}
</script>

<style scoped>
.password-input-eye {
  position: absolute;
  right: 10px;
  top: 15px;
}

.password-input-eye-clicked {
  color: var(--red) !important;
}
</style>