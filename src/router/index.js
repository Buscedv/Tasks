import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Tasks from "../views/Tasks";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Tasks',
        component: Tasks,
    },
    {
        path: '/login',
        name: 'Login',
        component: Home,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
