import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import './assets/bootstrap.min.css'
import './assets/style.css'

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
