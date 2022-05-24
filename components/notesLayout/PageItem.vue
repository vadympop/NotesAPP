<template>
  <div>
    <div
      :class="{ 'page-item': true, 'page-item-active': isActive }"
      :style="`padding-left: ${paddingLeft}px`"
    >
      <nuxt-link :to="`/${pageId}`" class="page-item-link"></nuxt-link>
      <span @click="arrowClicked = !arrowClicked">
        <v-icon
          :class="{
            'page-item-triangle': true,
            'page-item-triangle-clicked': arrowClicked
          }"
          color="var(--light-gray3)"
          size="12px"
          >mdi-triangle</v-icon
        >
      </span>
      <v-icon class="page-item-icon" color="var(--light-gray3)">
        mdi-file-document-outline
      </v-icon>
      <span class="page-item-text">{{ pageName }}</span>
      <v-spacer></v-spacer>
      <v-menu offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <button-icon
            icon="mdi-dots-horizontal"
            tooltip="Page settings"
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <div class="page-menu">
          <page-rename-input :page-id="pageId" top="-15%" left="105%">
            <template #activator>
              <div class="page-menu-item">
                <v-icon size="22px" color="var(--light-gray3)"
                  >mdi-rename-box</v-icon
                >
                <span class="ml-2">Rename</span>
              </div>
            </template>
          </page-rename-input>
        </div>
      </v-menu>
    </div>
    <div v-if="arrowClicked">
      <div v-if="nested.length > 0">
        <page-item
          v-for="page of nested"
          :key="page._id"
          :page-id="page._id"
          :name="page.name"
          :position="page.position"
          :nested-pages="page.nestedPages"
          :parent="page.parent"
          :root="page.root"
        />
      </div>
      <div v-else>
        <span
          class="no-nested-pages-text"
          :style="`padding-left: ${paddingLeft + 30}px`"
        >
          No pages inside
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PageItem',
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
    pageId: {
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
    paddingLeft: 15,
    pageName: ''
  }),
  computed: {
    nested() {
      return this.notRootPages.filter((page) =>
        this.nestedPages.includes(page._id)
      )
    },
    isActive() {
      return this.pageId === this.currentPage._id
    },
    ...mapGetters('pages', ['notRootPages']),
    ...mapState('pages', ['currentPage', 'pages'])
  },
  watch: {
    name(v) {
      console.log(v)
    }
  },
  created() {
    this.pageName = this.name
    if (!this.root && this.$parent?.paddingLeft) {
      this.paddingLeft = this.$parent?.paddingLeft + 15
    }
  },
  methods: {
    setPageName(name) {
      this.pageName = name
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
  position: relative;
}

.page-item-link {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.page-item:hover,
.page-item-active {
  background-color: var(--light-gray);
}

.page-item-icon {
  margin-right: 5px;
}

.page-item-text {
  font-size: 0.95em;
  font-weight: 550;
  text-overflow: ellipsis;
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

.page-menu-item {
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: 0.2s;
}

.page-menu {
  min-width: 200px;
  background-color: var(--dark-gray);
  border-radius: var(--small-border-radius);
  padding: 5px;
  position: relative;
}

.page-menu-item:hover {
  background-color: var(--gray);
}
</style>
