import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
  

const actions = {}

const mutations = {
    changeTermShow(state){
        state.termShow = !state.termShow
    },
    changeTabShow(state){
        state.termShow = !state.tabShow
    }
}

const state = {
    termShow: false,
    tabShow: false
}

const store = new Vuex.Store({
    actions,
    mutations,
    state
})

export default store