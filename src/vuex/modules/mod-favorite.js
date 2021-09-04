export default {
    namespaced: true,
    state: {
        favorite: [],
    },
    mutations: {
        SET_FAVORITE: (state, post) => {
            if(state.favorite.length){
                let isPost = false;
                state.favorite.map(function(item) {
                    if(item.id === post.id){
                        isPost = true;
                        state.favorite.splice(state.favorite.indexOf(item), 1)
                    }
                })
                if(!isPost){
                    state.favorite.push(post)
                }
            } else {
                state.favorite.push(post)
            }
        },
        REMOVE_FAVORITE: (state, id) => {
            state.favorite.map(function(item){
                if(item.id === id){
                    state.favorite.splice(state.favorite.indexOf(item), 1)
                }
            })
        },
    },
    actions: {
        SET_FAVORITE({commit}, post){
            commit('SET_FAVORITE', post);
        },
        REMOVE_FAVORITE({commit}, id){
            commit('REMOVE_FAVORITE', id);
        },
    },
    getters: {
        FAVORITE(state) {
            return state.favorite
        }
    }
}
