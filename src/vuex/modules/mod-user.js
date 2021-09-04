import axios from "axios";


var STORAGE = localStorage,
    API_TOKEN = STORAGE.getItem('API_TOKEN'),
    API_NAME = STORAGE.getItem('API_NAME');

export default {
    namespaced: true,
    state: {
        user: {},
        userStatus: '',
    },
    mutations: {
        SIGN_IN_SUCCESS: (state, user) => {
            state.user = user;
            state.userStatus = 'success';

            API_TOKEN = user.token;
            API_NAME = user.user_nicename;

            STORAGE.setItem('API_TOKEN', API_TOKEN);
            STORAGE.setItem('API_NAME', API_NAME);
        },
        SIGN_IN_ERROR: (state) => {
            state.user = {};
            state.userStatus = 'error';
        },
        SIGN_IN_LOADING: (state) => {
            state.userStatus = 'loading';
        },
        LOG_OUT: (state) => {
            state.user = ''
        },
    },
    actions: {
        SIGN_IN({commit}, data){
            commit('SIGN_IN_LOADING');
            return axios('http://blog-denis-malaiko.zzz.com.ua/wp-json/jwt-auth/v1/token', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                data: data
            }).then((user) => {

                commit('SIGN_IN_SUCCESS', user.data);
                return data;
            }).catch(() => {
                commit('SIGN_IN_ERROR');
            })
        },
        LOG_OUT({commit}){
            commit('LOG_OUT');
        },
    },
    getters: {
        USER(state) {
            return state.user
        },
        USER_STATUS(state) {
            return state.userStatus
        }
    }
}
