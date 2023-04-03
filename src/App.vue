<template>
  <AppNavigation />
  <router-view/>
  <AppFooter />
</template>

<script>
import AppFooter from './components/common/AppFooter.vue'
import AppNavigation from './components/common/AppNavigation.vue'


export default {
  name: 'App',
  components: {
    AppNavigation,
    AppFooter
  }
}
</script>

<style>
</style>
