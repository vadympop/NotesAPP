<template>
  <div
    :class="{'todo': true, 'todo-selected': isSelected}"
    @mouseenter="hoverableButtons = true"
    @mouseleave="hoverableButtons = false"
    @keyup.delete="removeTodo"
  >
    <div :class="{'hoverable-buttons': true, 'd-none': !hoverableButtons}">
      <v-icon class="hoverable-button new-todo-button hoverable-icon" color="var(--todos-list)">mdi-plus</v-icon>
      <v-icon class="hoverable-button interaction-button hoverable-icon" color="var(--todos-list)">mdi-dots-grid</v-icon>
      <div class="hoverable-button"></div>
    </div>
    <editable v-model="updatedContent" class="todo-content"/>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    content: {
      type: String,
      default: ''
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
  data () {
    return {
      hoverableButtons: false,
      isSelected: false,
      updatedContent: this.content
    }
  },
  methods: {
    removeTodo () {
      if (!this.updatedContent) {
        console.log('I can remove this todo')
      }
    }
  }
}
</script>

<style scoped>
.todo {
  padding: 5px;
  position: relative;
}

.todo ::selection {
  background-color: var(--dark-blue2);
  position: relative;
}

.todo-selected {
  background-color: var(--dark-blue);
}

.todo-content {
  font-size: 1.05em;
  font-weight: 450;
  color: #ffffff;
  width: 100%;
  word-break: break-word;
}

.todo-content:focus {
  outline: none;
}

.hoverable-button {
  position: absolute;
  top: 3px;
}

.new-todo-button {
  left: -60px;
}

.interaction-button {
  left: -30px;
}
</style>
