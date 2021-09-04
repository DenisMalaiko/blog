import axios from "axios";

export default {
    namespaced: true,
    state: {
        posts: [],
        pagesCount: '',
        categories: [],
        search: '',
        loadPost: false
    },
    mutations: {
        POSTS: (state, data) => {
            state.posts = []
            state.posts.push(data)
        },
        CLEAR_POSTS: (state) => {
            state.posts = [];
        },
        PAGES_COUNT: (state, data) => {
            state.pagesCount = data;
        },
        CATEGORIES: (state, categories) => {
            state.categories.push(categories);
        },
        SEARCH: (state, search) => {
            state.search = search
        },
        START_LOAD_POSTS : (state) => {
            state.loadPost = true;
        },
        END_LOAD_POST : (state) => {
            state.loadPost = false;
        }
    },
    actions: {
        GET_POSTS({commit}, pageParams){
            return axios(`http://blog-denis-malaiko.zzz.com.ua/wp-json/wp/v2/posts`, {
                method: "GET",
                params: {
                    page: pageParams.page,
                    per_page: pageParams.postLimit,
                    categories: pageParams.categories.length ? pageParams.categories : null,
                    search: pageParams.search.length ? pageParams.search : null
                }
            }).then((data) => {
                commit('PAGES_COUNT', data.headers['x-wp-totalpages']);
                commit('POSTS', data.data);
                return data;
            }).catch((error) => {
                alert('Get Posts ' + error)
            })
        },
        GET_POST({commit}, postId){
            return axios(`http://blog-denis-malaiko.zzz.com.ua/wp-json/wp/v2/posts`, {
                method: "GET",
                params: {
                    include: postId
                }
            }).then((data) => {
                commit('POSTS', data.data);
                return data;
            }).catch((error) => {
                alert('Get Post ' + error)
            })
        },
        GET_CATEGORIES({commit}){
            return axios(`http://blog-denis-malaiko.zzz.com.ua/wp-json/wp/v2/categories`, {
                method: "GET",
            }).then((data) => {
                commit('CATEGORIES', data.data);
                return data;
            }).catch((error) => {
                alert('Get Categories ' + error)
            })
        },

        SET_SEARCH({commit}, search){
            commit('SEARCH', search);
        },

        CLEAR_POSTS({commit}){
            commit('CLEAR_POSTS');
        },
        START_LOAD_POSTS({commit}){
            commit('START_LOAD_POSTS');
        },
        END_LOAD_POSTS({commit}){
            commit('END_LOAD_POST');
        }

    },
    getters: {
        POSTS(state){
            return state.posts.flat(Infinity);
        },
        PAGES_COUNT(state){
            return state.pagesCount;
        },
        CATEGORIES(state){
            const categories = state.categories.flat(Infinity);
            categories.pop()
            return categories;
        },
        SEARCH(state){
            return state.search;
        },
        LOAD_POST(state){
            return state.loadPost;
        }
    }
}
