import VueRouter  from "vue-router";
import DeskTest from '../components/DeskTest'
import Login from  '../components/Login'
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