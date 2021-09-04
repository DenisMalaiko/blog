<template>
    <section class="v-blog">
        <div class="container">

            <div class="row">
                <div class="col-md-2">
                    <aside class="sidebar">
                        <h5>Filters</h5>
                        <div class="sidebar-inner">
                            <div
                                    class="form-check"
                                    v-for="category in CATEGORIES"
                                    :key="category.id"
                            >
                                <input class="form-check-input"
                                       type="checkbox"
                                       v-model="categories"
                                       :value="category.id"
                                       :id="category.slug"
                                >
                                <label class="form-check-label" :for="category.slug">
                                    {{category.name}}
                                </label>
                            </div>
                        </div>
                    </aside>
                </div>
                <div class="col-md-10">
                    <div class="section-top">
                        <h5>Posts</h5>
                    </div>

                    <vLoading v-if="loading" />

                    <div v-else class="row v-blog-list">
                        <vCard
                                v-for="post in POSTS"
                                :key="post.id"
                                :post="post"
                        ></vCard>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <keep-alive>
                                <vPagination
                                        :pages="PAGES_COUNT"
                                        @currentPage="currentPage"
                                />
                            </keep-alive>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    import vLoading from '../elements/v-loading'
    import vPagination from '../elements/v-pagination'
    import vCard from '../elements/v-card'

    export default {
        name: "v-blog",
        data(){
            return {
                page: 1,
                postLimit: 8,
                categories: [],
                categoriesName: [],
                search: '',
                loading: true,
            }
        },
        components: {
            vLoading,
            vPagination,
            vCard
        },
        methods: {
            ...mapActions({
                GET_POSTS: 'infoModule/GET_POSTS',
                END_LOAD_POSTS: 'infoModule/END_LOAD_POSTS'
            }),
            currentPage(pageNum){
                // Зміна поточної сторінки
                this.page = pageNum
            },
        },
        computed: {
            ...mapGetters({
                POSTS: 'infoModule/POSTS',
                PAGES_COUNT: 'infoModule/PAGES_COUNT',
                CATEGORIES: 'infoModule/CATEGORIES',
                SEARCH: 'infoModule/SEARCH',
                LOAD_POST: 'infoModule/LOAD_POST'
            }),
            searchComputed: function(){
                return this.SEARCH
            },
            posts() {
                return this.POSTS
            },
            loadPost() {
                return this.LOAD_POST
            }
        },
        watch: {
            loadPost(){
                this.END_LOAD_POSTS()
                let pageParams = {
                    page: this.page,
                    postLimit: this.postLimit,
                    categories: this.categories,
                    search: this.search
                }
                this.GET_POSTS(pageParams);
            },
            // Слідкування за поточною сторінкою
            // / ------------------------ //
            page(){
                this.loading = true
                let pageParams = {
                    page: this.page,
                    postLimit: this.postLimit,
                    categories: this.categories,
                    search: this.search
                }
                this.GET_POSTS(pageParams);
            },
            // Фільтрація
            // / ------------------------ //
            categories(){
                this.loading = true
                let pageParams = {
                    page: this.page,
                    postLimit: this.postLimit,
                    categories: this.categories,
                    search: this.search
                }
                this.GET_POSTS(pageParams);
            },
            // Пошук
            // / ------------------------ //
            searchComputed(value){
                this.loading = true
                this.search = value
                let pageParams = {
                    page: this.page,
                    postLimit: this.postLimit,
                    categories: this.categories,
                    search: this.search
                }
                this.GET_POSTS(pageParams);
            },
            posts(value){
                if(value.length){
                    this.loading = false
                }
            }
        },
        mounted() {
            let pageParams = {
                page: this.page,
                postLimit: this.postLimit,
                categories: this.categories,
                search: this.search
            }
            this.GET_POSTS(pageParams);
        },
    }
</script>
<style>
</style>
