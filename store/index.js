import Vue from 'vue'
import Vuex from 'vuex'
import core from './core'
import subject from './subject'
import user from './user'
import page from './page'
import search from './search'
import section from './section'
import notification from './notification'
import error from './error'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
        modules: {
          core,
          subject,
          user,
          page,
          section,
          search,
          notification,
          error
        },

        state: {
          downloaded: false
        }
})
}