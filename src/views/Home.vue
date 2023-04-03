<template>
    <AppHero/>
    <AppGroupTasks/>
    <ButtonCreateTaskVue/>
</template>


<script>
import { defineComponent } from 'vue'
import AppHero from '../components/AppHero.vue'
import AppGroupTasks from '../components/AppGroupTasks.vue'
import ButtonCreateTaskVue from '@/components/ButtonCreateTask.vue'

export default defineComponent({
    name: `Home`,
    components: {
        AppHero,
        AppGroupTasks,
        ButtonCreateTaskVue
    }
})
</script>
