<template>
  <div class="todo-item">
    <span class="d-flex" @click="arrowClicked = !arrowClicked">
      <v-icon
        :class="{'todo-item-triangle': true, 'todo-item-triangle-clicked': arrowClicked}"
        color="var(--todos-list)"
        size="12px"
      >mdi-triangle</v-icon>
    </span>
    <v-icon class="todo-item-icon" color="var(--todos-list)" size="24px">mdi-file-document-outline</v-icon>
    <span class="todo-item-text">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    name: {
      type: String,
      required: true
    },
  },
  data: () => ({
    arrowClicked: false
  })
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
}

.todo-item:hover {
  background-color: var(--light-gray);
}

.todo-item-icon {
  margin: 0 5px;
}

.todo-item-text {
  font-size: 0.95em;
  font-weight: 550;
}

.todo-item-triangle {
  transform: rotate(90deg);
  transition: 0.2s;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--small-border-radius);
}

.todo-item-triangle:hover {
  background-color: var(--light-gray2);
}

.todo-item-triangle-clicked {
  transform: rotate(180deg) !important;
}
</style>
