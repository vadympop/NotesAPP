<template>
  <div style="position: relative">
    <div :ref="`page-rename-activator-${pageId}`" @click="clicked = !clicked">
      <slot name="activator"></slot>
    </div>
    <transition name="fade">
      <div
        :ref="`page-rename-${pageId}`"
        :style="{ top, bottom, left, right, position: 'absolute' }"
      >
        <div v-if="clicked" class="page-rename">
          <input
            :ref="`page-rename-input-${pageId}`"
            v-model="updatedPageName"
            class="page-rename-input"
            type="text"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'PageRenameInput',
  props: {
    pageId: {
      type: String,
      required: true
    },
    top: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      clicked: false,
      updatedPageName: '',
      debouncedChangePageName: debounce(this.changePageName, 2000)
    }
  },
  computed: {
    ...mapState('pages', ['pages']),
    foundPage() {
      return this.pages.find((page) => page._id === this.pageId)
    }
  },
  watch: {
    updatedPageName(v) {
      if (v.trim() !== this.foundPage.name) {
        this.debouncedChangePageName()
      }
    },
    foundPage(page) {
      if (page) {
        this.updatedPageName = page.name
      }
    }
  },
  mounted() {
    this.updatedPageName = this.foundPage ? this.foundPage.name : ''
    this.outsideClickEvent = (e) => {
      const renameInput = this.$refs[`page-rename-${this.pageId}`]
      const activator = this.$refs[`page-rename-activator-${this.pageId}`]
      if (
        renameInput &&
        activator &&
        !renameInput.contains(e.target) &&
        !activator.contains(e.target)
      ) {
        this.clicked = false
      }
    }
    window.addEventListener('click', this.outsideClickEvent)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.outsideClickEvent)
  },
  methods: {
    changePageName() {
      this.$store.dispatch('pages/editPage', {
        pageId: this.pageId,
        updated: { name: this.updatedPageName.trim() }
      })
    }
  }
}
</script>

<style scoped>
.page-rename {
  padding: 5px;
  background-color: var(--gray);
  border-radius: var(--border-radius);
  min-width: 350px;
}

.page-rename-input {
  padding: 5px;
  color: #ffffff;
  width: 100%;
  background-color: var(--light-gray);
  border-radius: var(--border-radius);
}

.page-rename-input:focus-visible {
  outline: none;
}
</style>
