<template>
  <router-link
    :to="to"
    v-bind="attrs"
  >
    <slot />
  </router-link>
</template>

<script>
import { defineComponent, PropType } from 'vue'
import { RouteParams } from 'vue-router'
import { AppRouteNames } from './router'

(AppRouteNames)

export default defineComponent({
  name: 'AppLink',
  props: {
    name: { type: String as PropType<AppRouteNames>, required: true },
    params: { type: Object as PropType<RouteParams>, default: () => ({}) },
  },
  setup (props, { attrs }) {
    return {
      to: props,
      attrs,
    }
  },
})

</script>