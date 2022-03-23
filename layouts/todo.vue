<template>
  <v-app dark>
    <v-main>
      <div class="todo-layout">
        <div class="todos-list">
          <todo-item name='Name'/>
        </div>
        <div class="todos-content">
          <v-container>
            <Nuxt />
          </v-container>
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
  flex-grow: 0;
  flex-shrink: 0;
  width: 260px;
  background-color: var(--gray);
  padding: 1em 0;
  color: var(--todos-list);
}

.todos-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: var(--dark-gray);
}

</style>
