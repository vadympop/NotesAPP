<template>
  <div>
    <v-row class="mt-6">
      <v-col cols="12" lg="6" md="4" class="d-flex hidden-md-and-down">
        <img src="https://via.placeholder.com/600x400" alt="" />
      </v-col>
      <v-col cols="12" lg="6" md="8" class="pa-10 flex-column d-flex">
        <h1>HotesApp</h1>
        <p style="max-width: 60%">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias,
          commodi culpa distinctio et exercitationem mollitia nobis officia
          quidem, quo sed similique tempora unde vitae. Alias architecto nostrum
          numquam provident sapiente!
        </p>
      </v-col>
      <v-col cols="12" lg="4" md="3" sm="4" style="position: relative">
        <strong v-if="!isLoggedIn" class="login-first">Login first</strong>
        <div :class="{ 'info-block': true, blured: !isLoggedIn }">
          <strong class="mb-2 info-block-title">Your pages</strong>
          <div
            v-if="pages.length > 0"
            class="d-flex flex-column pages-list"
            style="flex: 1 1 0"
          >
            <nuxt-link
              v-for="page of pages"
              :key="page._id"
              :to="`/${page._id}`"
              class="pages-list-item"
            >
              <v-icon color="var(--light-gray3)" size="24px"
                >mdi-file-document-outline</v-icon
              >
              <span class="pages-list-items-text">{{ page.name }}</span>
            </nuxt-link>
            <v-spacer></v-spacer>
            <div>
              <add-new-page-dialog />
            </div>
          </div>
          <div v-else style="margin-top: auto">
            <add-new-page-dialog />
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="3" sm="4" style="position: relative">
        <strong v-if="!isLoggedIn" class="login-first">Login first</strong>
        <div :class="{ 'info-block': true, blured: !isLoggedIn }">
          <strong class="mb-2 info-block-title">Your favourite pages</strong>
          <div
            v-if="favouritePages.length > 0"
            class="d-flex flex-column pages-list"
          >
            <nuxt-link
              v-for="page of favouritePages"
              :key="page._id"
              :to="`/${page._id}`"
              class="pages-list-item"
            >
              <v-icon color="var(--yellow)" size="24px">mdi-star</v-icon>
              <span class="pages-list-items-text">{{ page.name }}</span>
            </nuxt-link>
          </div>
          <div v-else style="margin: auto">
            <span style="font-weight: 300">Nothing to show</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserProfile',
  data: () => ({
    isLoggedIn: true,
  }),
  computed: {
    favouritePages() {
      return this.pages.filter((page) => page.favourite)
    },
    ...mapState(['pages']),
  },
  mounted() {
    document.documentElement.style.overflow = 'auto'
    this.$store.dispatch('getUserPages')
  },
}
</script>

<style scoped>
.info-block {
  padding: 15px;
  margin: 2px;
  background-color: var(--gray);
  border-radius: var(--border-radius);
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.blured {
  filter: blur(4px);
}

.pages-list-item {
  padding: 5px;
  transition: 0.2s;
  cursor: pointer;
}

.pages-list-item:hover {
  background-color: var(--light-gray);
}

.pages-list-items-text {
  color: var(--light-gray3);
  font-size: 1.1em;
  text-decoration: none !important;
}

.login-first {
  position: absolute;
  top: 50%;
  left: 40%;
  z-index: 10;
}

.info-block-title {
  border-bottom: 1px var(--light-gray) solid;
  padding: 5px 0 5px 5px;
}
</style>
