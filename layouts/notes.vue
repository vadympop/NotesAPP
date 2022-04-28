<template>
  <v-app dark>
    <v-main>
      <div class="notes-layout">
        <div class="pages-list">
          <nuxt-link to="/" class="additional-page-item">
            <img src="https://via.placeholder.com/128x128" alt="avatar" class="main-page-item-image" width="48">
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
          <add-new-page-dialog/>
        </div>
        <div class="notes-page">
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
  name: 'NotesLayout',
  computed: mapGetters(['rootPages']),
  mounted() {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      console.log('unload')
    })
  }
}
</script>

<style scoped>
.notes-layout {
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
  height: 100vh;
  flex-direction: column;
  background-color: var(--gray);
  color: var(--light-gray3);
}

.notes-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--dark-gray);
}

.main-page-item-image {
  border-radius: var(--border-radius);
  margin: 0 5px 0 10px;
}
</style>
