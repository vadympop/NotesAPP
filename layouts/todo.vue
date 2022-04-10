<template>
  <v-app dark>
    <v-main>
      <div class="todo-layout">
        <div class="pages-list">
          <nuxt-link to="/" class="additional-page-item">
            <img src="https://via.placeholder.com/128x128" alt="avatar" class="main-todo-item-image" width="48">
            <span class="additional-page-item-text">USer Name</span>
          </nuxt-link>
          <v-divider></v-divider>

          <div class="mt-10">
            <page-item
              v-for="page of rootPages"
              :id="page.id"
              :key="page.id"
              :name="page.name"
              :position="page.position"
              :nested-pages="page.nestedPages"
              :parent="page.parent"
              :root="page.root"
            />
          </div>

          <v-spacer></v-spacer>

          <trash-dialog/>
          <v-divider class="mt-10"></v-divider>
          <div class="additional-page-item">
            <v-icon class="additional-page-item-icon" color="var(--todos-list)" size="24px">mdi-plus</v-icon>
            <span class="additional-page-item-text">New page</span>
          </div>
        </div>
        <div class="todo-page">
          <page-header/>
          <Nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'TodoLayout',
  computed: mapGetters(['rootPages']),
  mounted() {
    this.$store.dispatch('getUserPages')
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      console.log('unload')
    })
  }
}
</script>

<style scoped>
.todo-layout {
  width: 100vw;
  height: 100%;
  display: flex;
  flex: 1 1 0;
}

.pages-list {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  width: 260px;
  flex-direction: column;
  background-color: var(--gray);
  color: var(--light-gray3);
}

.todo-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--dark-gray);
}

.additional-page-item {
  display: flex;
  align-items: center;
  padding: 15px;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
}

.additional-page-item:hover {
  background-color: var(--light-gray);
}

.additional-page-item-icon {
  margin: 0 5px;
}

.additional-page-item-text {
  margin-left: 5px;
  font-size: 1.05em;
  font-weight: 550;
  color: var(--light-gray3);
  text-decoration: none;
}

.main-todo-item-image {
  border-radius: var(--border-radius);
  margin: 0 5px 0 10px;
}
</style>
