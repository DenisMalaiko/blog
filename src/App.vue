<template>
  <div id="app">

      <vHeader />

      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <vFooter />

      <vPopup />

  </div>
</template>

<script>

import vHeader from './components/elements/v-header'
import vFooter from './components/elements/v-footer'
import vPopup from './components/elements/v-popup'
import {mapActions} from "vuex";

export default {
    name: 'App',
    components: {
        vHeader,
        vPopup,
        vFooter
    },
    methods: {
        ...mapActions({
            GET_CATEGORIES: 'infoModule/GET_CATEGORIES',
        }),
    },
    created() {
        this.GET_CATEGORIES();
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
