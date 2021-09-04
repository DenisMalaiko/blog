<template>
    <div class="v-popup" v-if="popupState">
        <div class="v-popup-wrap">

            <div class="v-popup-login">
                <div class="v-popup-top">
                    <h3>Sign In</h3>
                    <button
                            class="btn-close"
                            @click="closePopup()"
                    ></button>
                </div>
                <div class="v-popup-loading" v-if="loading">
                    <vLoading />
                </div>
                <div class="v-popup-conent" v-else>
                    <div
                            class="v-popup-alert"
                            v-if="showAlert"
                    >
                        <div
                                class="alert alert-success"
                                v-if="showAlertSuccess"
                        >
                            User success login
                        </div>
                        <div
                                class="alert alert-danger"
                                v-else
                        >
                            User failed login
                        </div>
                    </div>
                    <div class="v-popup-form">
                        <form @submit.prevent="signInForm">
                            <div class="mb-3">
                                <label class="form-label">Username:</label>
                                <input
                                        type="text"
                                        class="form-control"
                                        v-model="signIn.username"
                                        :class="$v.signIn.username.$error ? 'is-invalid' : ''"
                                >
                                <span
                                        class="form-error"
                                        v-if="$v.signIn.username.$dirty && !$v.signIn.username.required"
                                >Input is requried</span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password:</label>
                                <input
                                        type="password"
                                        class="form-control"
                                        v-model="signIn.password"
                                        :class="$v.signIn.password.$error ? 'is-invalid' : ''"
                                >
                                <span
                                        class="form-error"
                                        v-if="$v.signIn.password.$dirty && !$v.signIn.password.required"
                                >This input requried</span>

                                <span
                                        class="form-error"
                                        v-if="$v.signIn.password.$dirty && !$v.signIn.password.minLength"
                                >Min length 5</span>
                            </div>
                            <button class="btn btn-success" type="submit">
                                Sign in
                            </button>

                            <div class="accordion mt-3">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" @click="showAccess = !showAccess">
                                        <button
                                                class="accordion-button"
                                                type="button"
                                                :class="showAccess ? '' : 'collapsed'"
                                        >
                                            Show Access
                                        </button>
                                    </h2>
                                    <div
                                            class="accordion-collapse collapse"
                                            :class="showAccess ? 'show' : ''"
                                    >
                                        <div class="accordion-body">
                                            <span>Username: <strong>admin</strong></span>
                                            <span>Password: <strong>12345</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import { required, minLength} from 'vuelidate/lib/validators'

    import vLoading from '../elements/v-loading'

    export default {
        name: "v-popup",
        data(){
            return {
                signIn: {
                    status: true,
                    username: '',
                    password: '',
                },
                loading: false,
                showAlert: false,
                showAlertSuccess: false,
                showAccess: false
            }
        },
        components: {
            vLoading
        },
        validations: {
            signIn: {
                username: {required,},
                password: {required,minLength: minLength(5)}
            }
        },
        computed: {
            ...mapGetters({
                POPUP_STATUS: 'popupModule/POPUP_STATUS',
                USER_STATUS: 'userModule/USER_STATUS'
            }),
            popupState() {
                return this.POPUP_STATUS
            },
            userStatus(){
                return this.USER_STATUS
            }
        },
        watch: {
            userStatus(){
                let userStatus = this.userStatus;
                switch(userStatus){
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
                        setTimeout(() => {
                            this.$router.push('/profile');
                            this.showAlert = false;
                            this.CLOSE_POPUP();
                            this.signIn.password = '';
                            this.signIn.username = '';
                            this.$v.$reset()
                        }, 1000);
                        break;
                }
            }
        },
        methods: {
            ...mapActions({
                CLOSE_POPUP: 'popupModule/CLOSE_POPUP',
                SIGN_IN: 'userModule/SIGN_IN',
                SIGN_UP: 'userModule/SIGN_UP'
            }),
            closePopup(){
                this.CLOSE_POPUP()
            },
            signInForm(){
                this.$v.signIn.$touch();

                if(!this.$v.signIn.$error){
                    this.loading = true;
                    let data = {
                        username: this.signIn.username,
                        password: this.signIn.password
                    }
                    this.SIGN_IN(data);
                }
            }
        }
    }
</script>
<style>
</style>
