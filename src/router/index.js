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
        name: 'taskCreate',
        path: '/tasks/:taskId/create',
        meta: { auth: true },
        component: () => import(/* webpackChunkName: "profile" */ '../views/EditTaskItem.vue')
    },
    {
        name: 'editTask',
        path: '/tasks/:taskId/edit',
        meta: { auth: true },
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
        name: 'userTaskItems',
        path: '/user/:userId/tasks/:taskId/items',
        component: () => import(/* webpackChunkName: "profile" */ '../views/UserTaskItems.vue')
    },
    {
        name: 'myTasks',
        path: '/mytasks',
        meta: { auth: true },
        component: () => import(/* webpackChunkName: "profile" */ '../views/MyTasks.vue')
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
    if (to.meta.auth && localStorage.getItem('currentUser') === null) {
        console.log("인증이 필요합니다.");
        next('/login');
        return;
    }
    next();
})
  
export default router