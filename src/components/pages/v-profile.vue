<template>
    <section class="v-profile">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-top">
                        <h5>Hello <span>{{loginName}}</span>!</h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="v-profile-wrap">
                        <div class="v-profile-loading" v-if="loading">
                            <vLoading />
                        </div>
                        <div class="v-profile-form" v-else>
                            <form @submit.prevent="sendPost">
                                <div class="mb-3">
                                    <h5>Add new post</h5>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Title post:</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            v-model="post.title"
                                            :class="$v.post.title.$error ? 'is-invalid' : ''"
                                    >
                                    <span
                                            class="form-error"
                                            v-if="$v.post.title.$dirty && !$v.post.title.required"
                                    >Input is requried</span>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Text post:</label>
                                    <textarea
                                            class="form-control"
                                            v-model="post.text"
                                            :class="$v.post.text.$error ? 'is-invalid' : ''"
                                    ></textarea>
                                    <span
                                            class="form-error"
                                            v-if="$v.post.text.$dirty && !$v.post.text.required"
                                    >Input is requried</span>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label">Categories post:</label>
                                    <div class="form-check-group">
                                        <div
                                               class="form-check form-switch"
                                               v-for="category in CATEGORIES"
                                               :key="category.id"
                                        >
                                           <label class="form-check-label">
                                               <input
                                                       class="form-check-input"
                                                       type="checkbox"
                                                       v-model="post.categories"
                                                       :value="category.id"
                                                       :id="category.slug"
                                               >
                                               {{category.name}}
                                           </label>
                                        </div>
                                    </div>
                                    <span
                                            class="form-error"
                                            v-if="$v.post.categories.$error"
                                    >One category is required</span>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label">Photo post:</label>
                                    <input
                                            type="file"
                                            class="form-control"
                                            multiple
                                            accept=".jpg, .jpeg, .png"
                                            @change="upload($event); post.file = true"
                                            :class="$v.post.model.file.$error ? 'is-invalid' : ''"
                                    >
                                    <span
                                            class="form-error"
                                            v-if="$v.post.model.file.$error"
                                    >Photo is required</span>
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary">Send post</button>
                                </div>
                            </form>
                            <div
                                    class="v-profile-alert"
                                    v-if="showAlert"
                            >
                                <div
                                        class="alert alert-success"
                                        v-if="showAlertSuccess"
                                >
                                    Post success added
                                </div>
                                <div
                                        class="alert alert-danger"
                                        v-else
                                >
                                    Post failed added
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import {required,requiredIf} from 'vuelidate/lib/validators'
    import vLoading from '../elements/v-loading'

    export default {
        name: "v-profile",
        data(){
            return {
                loginName: '',
                post: {
                    title: '',
                    text: '',
                    file: false,
                    filePhoto: '',
                    categories: [],
                },
                loading: false,
                showAlert: false,
                showAlertSuccess: false,
            }
        },
        components: {
            vLoading
        },
        validations: {
            post: {
                title: {required},
                text: {required},
                model: {
                    file: {
                        required: requiredIf(function () {
                            return this.post.file == false
                        })
                    }
                },
                categories: {required}
            }
        },
        computed: {
            ...mapGetters({
                user: 'userModule/USER',
                POST_STATUS: 'postModule/POST_STATUS',
                CATEGORIES: 'infoModule/CATEGORIES',
                POSTS: 'infoModule/POSTS',
            }),
            postStatus(){
                return this.POST_STATUS
            }
        },
        watch: {
            postStatus(){

                let postStatus = this.postStatus;
                switch(postStatus){
                    case 'loading':
                        return
                    case 'error':
                        this.loading = false;
                        this.showAlert = true;
                        this.showAlertSuccess = false;

                        break;
                    case 'success':
                        this.loading = false;
                        this.showAlert = true;
                        this.showAlertSuccess = true;

                        this.CLEAR_POSTS();
                        this.START_LOAD_POSTS();

                        setTimeout(() => {
                            this.showAlert = false;
                            this.post.title = '';
                            this.post.text = '';
                            this.$v.$reset()
                        }, 1000);

                        break;
                }
            }
        },
        methods: {
            ...mapActions({
                SEND_POST: 'postModule/SEND_POST',
                CLEAR_POSTS: 'infoModule/CLEAR_POSTS',
                START_LOAD_POSTS: 'infoModule/START_LOAD_POSTS',
                GET_POSTS: 'infoModule/GET_POSTS',
            }),
            upload(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.post.filePhoto = e.target.files[0];
            },
            sendPost(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                this.loading = true;

                let postInfo = new FormData();
                postInfo.append('title', this.post.title);
                postInfo.append('content', this.post.text);
                postInfo.append('status', 'publish');
                postInfo.append('categories', this.post.categories);
                // postInfo.append('featured_media', 83);

                let postPhoto = new FormData();
                postPhoto.append('status', 'publish');
                postPhoto.append('file', this.post.filePhoto);

                const postData = {
                    postInfo: postInfo,
                    postPhoto: postPhoto
                }

                this.SEND_POST(postData);


            },
        },
        mounted() {
            if (localStorage.getItem('API_TOKEN')) {
                this.loginName = localStorage.getItem('API_NAME');
            }
        },
    }
</script>
<style>
</style>
