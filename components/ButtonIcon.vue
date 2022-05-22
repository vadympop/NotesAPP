<template>
  <div v-on="$listeners">
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-icon
          class="hoverable-icon"
          :color="color"
          :size="size"
          v-bind="attrs"
          v-on="on"
        >
          {{ icon }}
        </v-icon>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ButtonIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '24px'
    },
    color: {
      type: String,
      default: 'var(--light-gray3)'
    }
  }
}
</script>
