import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
  

const actions = {}

const mutations = {
    changeTermShow(state){
        state.termShow = !state.termShow
    },
    changeTabShow(state){
        state.tabShow = !state.tabShow
    },
    getUserInfo(state){
        return state.userInfo
    },
    setUserInfo(state,newInfo){
        state.userInfo = newInfo
    }
}

const state = {
    termShow: false,
    tabShow: false,
    userInfo:{
        user:'',
        path:'',
        token:''
    },
    Terms:[
        {
            termShow: false,
            tabShow: false,
            time:1648971213140,
            
        }
    ]
}

const store = new Vuex.Store({
    actions,
    mutations,
    state
})

export default store