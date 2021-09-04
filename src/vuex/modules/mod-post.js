import axios from 'axios'

// var API_TOKEN = localStorage.getItem('API_TOKEN');

export default {
    namespaced: true,
    state: {
        postStatus: ''
    },
    mutations: {
        POST_SEND_SUCCESS: (state) => {
            state.postStatus = 'success';
        },
        POST_SEND_ERROR: (state) => {
            state.postStatus = 'error';
        },
        POST_SEND_LOADING:(state) => {
            state.postStatus = 'loading';
        },
    },
    actions:{

        SEND_POST({commit}, postData){
            commit('POST_SEND_LOADING')

            // CREATE POST
            return axios(`http://blog-denis-malaiko.zzz.com.ua/wp-json/wp/v2/posts`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('API_TOKEN')}`
                },
                data: postData.postInfo
            }).then((data) => {

                // NEW POST ID
                let postId = data.data.id
                postData.postPhoto.append('post', postId);

                // CREATE PHOTO
                return axios(`http://blog-denis-malaiko.zzz.com.ua/wp-json/wp/v2/media`, {
                    method: "POST",
                    headers: {
                        'content-type' : 'multipart/form-data',
                        'Content-Disposition': 'filename=name-of-file.png',
                        'Authorization': `Bearer ${localStorage.getItem('API_TOKEN')}`,
                    },
                    data: postData.postPhoto,
                }).then((data) => {

                    // NEW PHOTO ID
                    let postPhotoId = data.data.id
                    postData.postInfo.append('featured_media', postPhotoId);

                    // BIND PHOTO ID TO POST ID
                    return axios(`http://blog-denis-malaiko.zzz.com.ua/wp-json/wp/v2/posts/${postId}`, {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('API_TOKEN')}`,
                        },
                        data: postData.postInfo,
                    }).then((data) => {
                        commit('POST_SEND_SUCCESS')
                        return data;
                    }).catch((error) => {
                        commit('POST_SEND_ERROR')
                        alert('BIND ID PHOTO AND ID POST ' + error)
                    })
                }).catch((error) => {
                    commit('POST_SEND_ERROR')
                    alert('Create photo ' + error)
                })
            }).catch((error) => {
                commit('POST_SEND_ERROR')
                alert('Create post ' + error)
            })
        },
    },
    getters:{
        POST_STATUS(state){
            return state.postStatus
        }
    }
}
