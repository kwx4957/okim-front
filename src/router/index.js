import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '../services/auth/auth';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'login',
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        name: 'profile',
        path: '/profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    },
    {
        name: 'taskCreate',
        path: '/tasks/:taskId/create',
        component: () => import(/* webpackChunkName: "profile" */ '../views/EditTaskItem.vue')
    },
    {
        name: 'editTask',
        path: '/tasks/:taskId/edit',
        component: () => import(/* webpackChunkName: "profile" */ '../views/EditTaskItem.vue')
    },
    {
        name: 'register',
        path: '/register',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Register.vue')
    },
    {
        name: 'userTasks',
        path: '/user/:userId/tasks',
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTasks.vue')
    },
    {
        name: 'myTasks',
        path: '/mytasks',
        component: () => import(/* webpackChunkName: "profile" */ '../views/MyTasks.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  
export default router