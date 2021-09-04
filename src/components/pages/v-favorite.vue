<template>
    <section class="v-favorite">
        <div class="container">

            <div class="row">
                <div class="col-12">
                    <div class="section-top">
                        <h5>Favorite posts</h5>
                    </div>
                </div>
            </div>
            <div class="row" v-if="!FAVORITE.length">
                <div class="col-12">
                    <h3>Favorite page is empty</h3>
                </div>
            </div>

            <div class="row" v-else>

                <vCard
                        v-for="post in FAVORITE"
                        :key="post.id"
                        :post="post"
                ></vCard>


<!--                <div-->
<!--                        class="col-md-3"-->
<!--                        v-for="post in FAVORITE"-->
<!--                        :key="post.id"-->
<!--                >-->

<!--                    <div class="card">-->
<!--                        <div v-if="post.better_featured_image">-->
<!--                            <router-link :to="{name: 'post', params: {id: post.id}}">-->
<!--                                <img :src="post.better_featured_image.source_url" class="card-img-top" alt="...">-->
<!--                            </router-link>-->
<!--                        </div>-->
<!--                        <div class="card-body">-->
<!--                            <router-link :to="{name: 'post', params: {id: post.id}}" class="card-title">-->
<!--                                <h5>{{post.title.rendered}}</h5>-->
<!--                            </router-link>-->
<!--                        </div>-->
<!--                        <div class="card-actions">-->
<!--                            <button class="btn-remove" @click="removeFavorite(post.id)">-->
<!--                                <svg height="329pt" viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>-->
<!--                            </button>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import vCard from '../elements/v-card'

    export default {
        name: "v-favorite",
        components: {
            vCard
        },
        computed: {
            ...mapGetters({
                FAVORITE: 'favoriteModule/FAVORITE'
            })
        },
        methods: {
            ...mapActions({
                REMOVE_FAVORITE: 'favoriteModule/REMOVE_FAVORITE'
            }),
            removeFavorite(id){
                this.REMOVE_FAVORITE(id)
            }
        }
    }
</script>

<style>

</style>
