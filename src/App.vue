<template>
  <div class="flex flex-col h-screen">
    <AppNavigation />
    <router-view/>
  </div>

</template>

<script>
import AppNavigation from './components/common/AppNavigation.vue'


export default {
  name: 'App',
  components: {
    AppNavigation
  }
}
</script>

<style>
</style>
