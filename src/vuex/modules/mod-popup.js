export default {
    namespaced: true,
    state: {
        popupStatus: false,
    },
    mutations: {
        OPEN_POPUP: (state) => {
            state.popupStatus = true
        },
        CLOSE_POPUP: (state) => {
            state.popupStatus = false
        }
    },
    actions: {
        OPEN_POPUP({commit}) {
            commit('OPEN_POPUP')
        },
        CLOSE_POPUP({commit}) {
            commit('CLOSE_POPUP')
        }
    },
    getters: {
        POPUP_STATUS(state){
            return state.popupStatus;
        }
    }
}
