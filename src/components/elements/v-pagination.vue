<template>
    <paginate
            :page-count="pages"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-link-class="'page-link'"
            :prev-link-class="'page-link'"
            :next-link-class="'page-link'"
            :page-class="'page-item'">
    </paginate>
</template>
<script>
    import Vue from 'vue'
    import Paginate from 'vuejs-paginate'
    Vue.component('paginate', Paginate)
    export default {
        name: "v-pagination",
        props: {
            pages: {
                type: String,
                required: true
            },
        },
        methods: {
            clickCallback(pageNum) {
                let $this = this
                setTimeout(function () {
                    $this.$emit('currentPage', pageNum)
                }, 1000)
            }
        }
    }
</script>
<style>
</style>
