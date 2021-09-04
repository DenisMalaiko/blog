<template>
    <section class="post">
        <div class="container">

            <div class="row">
                <div class="col-12">

                    <button
                            type="button"
                            class="btn btn-success mb-3"
                            @click="$router.go(-1)"
                    >Back</button>

                    <div class="section-top">
                        <h1>{{post.title.rendered}}</h1>
                    </div>

                    <img :src="post.better_featured_image.source_url" alt="">

                    <div v-html="post.content.rendered"></div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "v-post",
        data() {
            return {
                post: null,
            }
        },
        created() {
            if(!this.POSTS.length){
                this.GET_POST(this.$route.params.id)
            }
            this.getPost();
        },
        methods: {
            ...mapActions({
               GET_POST: 'infoModule/GET_POST'
            }),
            getPost(){
                let post = this.POSTS.find(post => post.id == this.$route.params.id)
                if(post){
                    this.post = post
                }
            }
        },
        computed: {
            ...mapGetters({
                POSTS: 'infoModule/POSTS'
            }),
            posts() {
                return this.POSTS
            }
        },
        watch: {
            '$route': 'getPost',
            posts(){
                this.getPost()
            }
        },
    }
</script>
<style>
</style>
