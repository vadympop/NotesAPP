<template>
  <div>
    <nuxt-link
      :to="`/${id}`"
      :class="{'page-item': true, 'page-item-active': isActive}"
      :style="`padding-left: ${paddingLeft}px`"
    >
      <span class="d-flex" @click="arrowClicked = !arrowClicked">
        <v-icon
          :class="{'page-item-triangle': true, 'page-item-triangle-clicked': arrowClicked}"
          color="var(--light-gray3)"
          size="12px"
        >mdi-triangle</v-icon>
      </span>
      <v-icon class="page-item-icon" color="var(--light-gray3)" size="24px">mdi-file-document-outline</v-icon>
      <span class="page-item-text">{{ name }}</span>
    </nuxt-link>
    <div v-if="arrowClicked">
      <div v-if="nested.length > 0">
        <page-item
          v-for="page of nested"
          :id="page.id"
          :key="page.id"
          :name="page.name"
          :position="page.position"
          :nested-pages="page.nestedPages"
          :parent="page.parent"
          :root="page.root"
        />
      </div>
      <div v-else>
        <span class="no-nested-pages-text" :style="`padding-left: ${paddingLeft+30}px`">No pages inside</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "PageItem",
  props: {
    name: {
      type: String,
      required: true
    },
    nestedPages: {
      type: Array,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    parent: {
      type: String,
      required: false,
      default: ''
    },
    root: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    arrowClicked: false,
    paddingLeft: 15
  }),
  computed: {
    nested () {
      return this.notRootPages.filter(page => this.nestedPages.includes(page.id))
    },
    isActive () {
      return this.id === this.currentPage.id
    },
    ...mapGetters(['notRootPages']),
    ...mapState(['currentPage'])
  },
  created() {
    if (!this.root && this.$parent?.paddingLeft) {
      this.paddingLeft = this.$parent?.paddingLeft + 15
    }
  }
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
  color: var(--light-gray3);
  text-decoration: none;
}

.page-item:hover, .page-item-active {
  background-color: var(--light-gray);
}

.page-item-icon {
  margin-right: 5px;
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
  margin: 0 5px;
}

.page-item-triangle:hover {
  background-color: var(--light-gray2);
}

.page-item-triangle-clicked {
  transform: rotate(180deg) !important;
}

.no-nested-pages-text {
  padding: 5px 15px;
  width: 100%;
  display: flex;
}
</style>
