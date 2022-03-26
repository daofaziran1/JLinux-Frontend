import VueRouter  from "vue-router";
import DeskTest from '../pages/DeskTest'
import Login from  '../pages/Login'
export default new VueRouter({
    routes: [
        {
            path:'/',
            component: Login
        },
        {
            name:'Desktop',
            path:'/Desktop',
            component: DeskTest
        }
    ]
})