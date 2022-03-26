<template>
  <div class="page-item">
    <span class="d-flex" @click="arrowClicked = !arrowClicked">
      <v-icon
        :class="{'page-item-triangle': true, 'page-item-triangle-clicked': arrowClicked}"
        color="var(--todos-list)"
        size="12px"
      >mdi-triangle</v-icon>
    </span>
    <v-icon class="page-item-icon" color="var(--todos-list)" size="24px">mdi-file-document-outline</v-icon>
    <span class="page-item-text">{{ name }}</span>
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
.page-item {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
}

.page-item:hover {
  background-color: var(--light-gray);
}

.page-item-icon {
  margin: 0 5px;
}

.page-item-text {
  font-size: 0.95em;
  font-weight: 550;
}

.page-item-triangle {
  transform: rotate(90deg);
  transition: 0.2s;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--small-border-radius);
}

.page-item-triangle:hover {
  background-color: var(--light-gray2);
}

.page-item-triangle-clicked {
  transform: rotate(180deg) !important;
}
</style>
