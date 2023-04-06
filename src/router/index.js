import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
        meta: { auth: true },
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    },
    {
        name: 'editTask',
        path: '/tasks/:taskId/edit',
        meta: { auth: true },
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTaskItems.vue')
    },
    {
        name: 'register',
        path: '/register',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Register.vue')
    },

    // User Tasks
    {
        name: 'myTasks',
        path: '/mytasks',
        meta: { auth: true },
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTasks.vue')
    },
    {
        name: 'userTasks',
        path: '/user/:userId/tasks',
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTasks.vue')
    },

    {
        name: 'taskCreate',
        path: '/tasks/:taskId/create',
        meta: { auth: true },
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTaskItems.vue')
    },
    {
        name: 'userTaskItems',
        path: '/user/:userId/tasks/:taskId/items',
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTaskItems.vue')
    },
    {
        name: 'groupList',
        path: '/groups',
        component: () => import(/* webpackChunkName: "groupList" */ '../views/GroupList.vue')
    },
    {
        name: 'groupsTask',
        path: '/groups/:groupId/tasks',
        component: () => import(/* webpackChunkName: "groupList" */ '../views/GroupTasks.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
router.beforeEach((to, from, next) => {
    // authentication filter
    if (to.meta.auth && localStorage.getItem('currentUser') === null) {
        next('/login');
        return;
    }
    if (to.name === 'myTasks' && localStorage.getItem('userId')) {
        const userId = localStorage.getItem("userId");
        if (userId) {
            to.params.userId = userId;
        }
    }
    next();
})

export default router