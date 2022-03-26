<template>
  <div class="page-header">
    <div class="pages-navigation">
      <v-icon class="pages-navigation-icon hoverable-icon" color="var(--todos-list)">mdi-arrow-left</v-icon>
      <v-icon class="pages-navigation-icon hoverable-icon" color="var(--todos-list)">mdi-arrow-right</v-icon>
    </div>
    <span class="page-header-name">Todo Page Name</span>
    <v-spacer></v-spacer>
    <div class="additional-buttons">
      <v-icon class="additional-button hoverable-icon" color="var(--todos-list)">
        mdi-star-outline
      </v-icon> <!-- Add to favourites -->
      <v-icon class="additional-button hoverable-icon" color="var(--todos-list)">
        mdi-comment-processing-outline</v-icon> <!-- View all comments on this page -->
      <v-icon class="additional-button hoverable-icon" color="var(--todos-list)">
        mdi-clock-outline
      </v-icon> <!-- View page updates -->
      <v-icon class="additional-button hoverable-icon" color="var(--todos-list)">
        mdi-dots-horizontal
      </v-icon> <!-- Settigns -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoPageHeader"
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
