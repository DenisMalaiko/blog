import Vue from 'vue'
import Vuex from 'vuex'

// import router from '@/router/router'

import popupModule from './modules/mod-popup'
import favoriteModule from './modules/mod-favorite'
import infoModule from './modules/mod-info'
import userModule from './modules/mod-user'
import postModule from './modules/mod-post'

Vue.use(Vuex)


let store = new Vuex.Store({
    modules: {
        popupModule,
        favoriteModule,
        infoModule,
        userModule,
        postModule
    }
})

export default store;
