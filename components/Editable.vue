<template>
  <div
    ref="editable"
    contenteditable
    aria-placeholder="Enter your text"
    v-on="listeners"
  />
</template>

<script>
export default {
  name: 'EditableElement',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput }
    },
  },
  mounted() {
    this.$refs.editable.innerText = this.value
  },
  methods: {
    onInput(e) {
      const targetText = e.target.innerText
      if (targetText === '\n') {
        this.$refs.editable.innerText = ''
      }
      this.$emit('input', targetText === '\n' ? '' : targetText)
    },
    updateText(v) {
      this.$refs.editable.innerText = v
    },
  },
}
</script>
