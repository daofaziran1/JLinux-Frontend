import VueRouter  from "vue-router";
import DeskTest from '../pages/DeskTest'
import Login from  '../pages/Login'
import UploadTest from '../components/UploadTest.vue'
import SystemState from '../components/SystemState.vue'
import Empty from "../components/Empty.vue";
import JVM from '../components/JVM.vue'
import Mem from '../components/Memory.vue'
import CPU from '../components/CPU.vue'
import Disk from '../components/Disk.vue'
export default new VueRouter({
    routes: [
        {
            path:'/',
            component: Login
        },
        {
            name:'Desktop',
            path:'/Desktop',
            component: DeskTest,
            children:[
                {
                    name:'System',
                    path:'/System',
                    component:SystemState,
                    children:[
                        {
                            path:'',
                            component:Empty
                        },
                        {
                            path:'cpu',
                            component:CPU
                        },
                        {
                            path:'mem',
                            component:Mem
                        },
                        {
                            path:'jvm',
                            component:JVM
                        },
                        {
                            path:'disk',
                            component:Disk
                        },
                    ]
                }
            ]
        },
        
    ]
})