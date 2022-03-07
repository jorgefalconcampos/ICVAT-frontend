import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import ResetPass from '../views/user/ResetPass.vue'
import ActivateAccount from '../views/user/ActivateAccount.vue';
import PageNotFound from '../views/other/PageNotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true }    
    },
    {
        path: '/reset-password',
        name: 'ResetPass',
        component: ResetPass,
        meta: { guest: true }    
    },
    {
        path: '/activate/:uid/:token',
        name: 'ActivateAccount',
        component: ActivateAccount,
        meta: { guest: true }    
    },
    {   
        path: '/documents',
        component: () => import('@/layouts/Layout'),
        meta: { requiresAuth: true },
        children: [
        {
            name: 'Profile',
            path: '/profile',
            component: () => import('@/views/pages/Profile'),
        },
        {
            name: 'Settings',
            path: '/settings',
            component: () => import('@/views/pages/Settings'),
        },
        {
            name: 'Documents',
            path: '/documents',
            component: () => import('@/views/dashboard/Documents/Documents'),
        },
        {
            name: 'DocumentsDetail',
            path: '/documents/:document_id',
            component: () => import('@/views/dashboard/Documents/DocumentsDetail'),
        },
        {
            name: 'Categories',
            path: '/categories',
            component: () => import('@/views/dashboard/Categories/Categories'),
        },
        {
            name: 'CategoriesDetail',
            path: '/categories/',
            component: () => import('@/views/dashboard/Categories/CategoriesDetail.vue'),
        },
        ],
        // component: Documents,
    },
    {
        path: '*',
        component: PageNotFound,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters["auth/isAuthenticated"]) {
            next();
            return;
        }
        next('/login')
    } else { next(); }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters["auth/isAuthenticated"]) {
            next("/documents");
            return;
        }
        next();
    } else { next(); }
});


export default router
