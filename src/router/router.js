import Vue from 'vue'
import VueRouter from 'vue-router'

import blog from '../components/pages/v-blog'

import post from '../components/pages/v-post'
import favorite from '../components/pages/v-favorite'
import profile from '../components/pages/v-profile'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'posts',
            component: blog,
            props: true,
        },
        {
            path: '/posts/:id',
            name: 'post',
            component: post,
            props: true,
            beforeRouteLeave(to, from, next) {
                const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
                if (answer) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/favorite',
            name: 'favorite',
            component: favorite,
            props: true,
            beforeRouteLeave(to, from, next) {
                const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
                if (answer) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: profile,
            props: true
        },
    ]
});


export default router;
