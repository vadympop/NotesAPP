<template>
  <div class="page-header">
    <div class="pages-navigation">
      <button-icon icon="mdi-arrow-left" tooltip="Go back" />
      <button-icon icon="mdi-arrow-right" tooltip="Go forward" />
    </div>
    <page-rename-input :page-id="pageId" top="125%" left="0">
      <template #activator>
        <span class="page-header-name">{{ currentPage.name }}</span>
      </template>
    </page-rename-input>
    <v-spacer></v-spacer>
    <div class="d-flex">
      <button-icon
        :icon="currentPage.favourite ? 'mdi-star' : 'mdi-star-outline'"
        tooltip="Pin the page on the sidebar"
        :color="currentPage.favourite ? 'var(--yellow)' : 'var(--light-gray3)'"
        @click="setCurrentPageFavourite"
      />
      <page-delete-dialog :page-id="pageId" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    pageId() {
      return this.$route.params.pageID
    },
    ...mapState('pages', ['currentPage'])
  },
  methods: {
    setCurrentPageFavourite() {
      this.$store.dispatch('pages/editPage', {
        pageId: this.pageId,
        updated: { favourite: !this.currentPage.favourite }
      })
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  padding: 20px 40px;
  align-items: center;
}

.page-header-name {
  font-size: 1.15em;
  padding: 5px;
  transition: 0.2s;
  border-radius: var(--border-radius);
  cursor: pointer;
}

.page-header-name:hover {
  background-color: var(--gray);
}

.pages-navigation {
  margin-right: 10px;
  display: flex;
}
</style>
