<template>
  <div class="page-header">
    <div class="pages-navigation">
      <button-icon
        icon="mdi-arrow-left"
        tooltip="Go back"
      />
      <button-icon
        icon="mdi-arrow-right"
        tooltip="Go forward"
      />
    </div>
    <span class="page-header-name">{{ currentPage.name }}</span>
    <v-spacer></v-spacer>
    <div class="d-flex ">
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
      console.log(1)
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
}

.page-header-name {
  font-size: 1.15em;
}

.pages-navigation {
  margin-right: 10px;
  display: flex;
}
</style>
