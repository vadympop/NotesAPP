<template>
<div class="todo" @mouseenter="hoverableButtons = true" @mouseleave="hoverableButtons = false">
  <div :class="{'hoverable-buttons': true, 'd-none': !hoverableButtons}">
    <v-icon class="hoverable-button new-todo-button hoverable-icon" color="var(--todos-list)">mdi-plus</v-icon>
    <v-icon class="hoverable-button interaction-button hoverable-icon" color="var(--todos-list)">mdi-dots-grid</v-icon>
    <div class="hoverable-button"></div>
  </div>
  <span class="todo-content">{{ content }}</span>
</div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    content: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    styles: {
      type: Object,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  data: () => ({
    hoverableButtons: false
  })
}
</script>

<style scoped>
.todo {
  padding: 5px;
  position: relative;
}

.todo-content {
  font-size: 1.05em;
  font-weight: 450;
}

.hoverable-button {
  position: absolute;
  bottom: 0;
  top: 0;
}

.new-todo-button {
  left: -60px;
}

.interaction-button {
  left: -30px;
}
</style>
