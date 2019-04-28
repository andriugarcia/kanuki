import Vue from 'vue'
import Router from 'vue-router'

import User from '~/pages/user.vue'
import Page from '~/pages/page.vue'
import Home from '~/pages/home.vue'
import Search from '~/pages/search.vue'


Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/search/:search',
            component: Search
        },
        {
            path: '/:user',
            component: User
        },
        // {
        //     path: '/:user/:subject',
        //     component: Subject
        // },
        {
            path: '/:user/*',
            component: Page
        },

    ]
    })
}