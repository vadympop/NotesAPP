<template>
  <div class="page-header">
    <div class="pages-navigation">
      <v-icon
        class="pages-navigation-icon hoverable-icon"
        color="var(--light-gray3)"
        >mdi-arrow-left</v-icon
      >
      <v-icon
        class="pages-navigation-icon hoverable-icon"
        color="var(--light-gray3)"
        >mdi-arrow-right</v-icon
      >
    </div>
    <span class="page-header-name">{{ currentPage.name }}</span>
    <v-spacer></v-spacer>
    <div class="additional-buttons">
      <v-icon
        class="additional-button hoverable-icon"
        color="var(--light-gray3)"
      >
        mdi-star-outline
      </v-icon>
      <!-- Add to favourites -->
      <page-delete-dialog class="additional-button" :page-id="pageId" />
      <page-comments-dialog class="additional-button" />
      <page-updates-dialog class="additional-button" />
      <v-icon
        class="additional-button hoverable-icon"
        color="var(--light-gray3)"
      >
        mdi-dots-horizontal
      </v-icon>
      <!-- Settigns -->
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
}

.additional-button {
  margin-right: 4px;
}
</style>
