<template>
  <div class ="console" v-show="isShow">
    <ul class="menu">
        <li class="consoleNum"><span class="num">{{info}}</span></li>
        <div class="tabs">
            <li class="tab" @click="changeShow"><span>一</span></li>
            <li class="tab" @click="close"><span>X</span></li>
        </div>
    </ul>
    <Term></Term>
  </div>
</template>
<script>
import Term from "./Term.vue"
    export default {
        name:'ConsoleWindow',
        data() {
            return {
                /*
                1、isShow 与 tabHidden 同时为true时，tab栏里面的按钮加深，且展示，
                2、isShow 为false，tabHidden为true时，tab栏里面按钮不加深，且不展示
                3、当两个都false时，tab栏消失，且不展示
                */  
                info:"console-1",
                // isShow:this.$store.state.termShow,
                tabShow:this.$store.state.tabShow
            }
        },
        computed :{
            isShow() {
                return this.$store.state.termShow
            }
        },
        methods:{
            changeShow(){
                this.$store.commit('changeTermShow')
            },
            close(){
                this.changeShow()
                this.$store.commit('changeTabShow')
                // 销毁这个控制台的使用，使用生命周期钩子销毁函数，但有bug
                // this.$destroy()
            }
        },
        components:{Term},
        beforeDestroy(){
            // 关闭一些功能
            this.changeShow()
        }
    }
</script>

<style>
    .console{
        height: 200px;
        width: 50%;
    }

    .menu{
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    .consoleNum{
        float: left;  
        background-color: rgb(86, 167, 93);  
        margin-right:5px;  
    }
    .num{
        display: block;
        color: white;
        text-align: center;
        padding: 8px 14px;

        text-decoration: none;
    }
    .tabs{
        float: right;
    }

    .tab{
        float: left;
    }

    li span {
        display: block;
        color: white;
        text-align: center;
        padding: 8px 14px;
        text-decoration: none;
    }

    li span:hover:not(.active) {
        background-color: #758676;
    }
</style>