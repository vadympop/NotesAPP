<template>
  <v-app dark>
    <v-main>
      <div class="todo-layout">
        <div class="todos-list">
          <div class="main-todo-item">
            <img src="https://via.placeholder.com/128x128" alt="avatar" class="main-todo-item-image" width="48">
            <span class="main-todo-item-text">USer Name</span>
          </div>
          <v-divider></v-divider>

          <div class="mt-10">
            <todo-item name='Name'/>
          </div>

          <v-spacer></v-spacer>

          <trash-dialog/>
          <v-divider class="mt-10"></v-divider>
          <div class="main-todo-item">
            <v-icon class="main-todo-item-icon" color="var(--todos-list)" size="24px">mdi-plus</v-icon>
            <span class="main-todo-item-text">New page</span>
          </div>
        </div>
        <div class="todo-page">
          <todo-page-header/>
          <div class="todo-page-container">
            <Nuxt />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'TodoLayout'
}
</script>

<style scoped>
.todo-layout {
  width: 100vw;
  height: 100%;
  display: flex;
  flex: 1 1 0;
}

.todos-list {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  width: 260px;
  flex-direction: column;
  background-color: var(--gray);
  color: var(--todos-list);
}

.todo-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: var(--dark-gray);
}

.main-todo-item {
  display: flex;
  align-items: center;
  padding: 15px;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
}

.main-todo-item:hover {
  background-color: var(--light-gray);
}

.main-todo-item-icon {
  margin: 0 5px;
}

.main-todo-item-text {
  margin-left: 10px;
  font-size: 1.05em;
  font-weight: 550;
}

.main-todo-item-image {
  border-radius: var(--border-radius);
}

.todo-page-container {
  padding: 8em;
}
</style>
