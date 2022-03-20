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
                info:"console-1",
                isShow:true
            }
        },
        methods:{
            changeShow(){
                this.isShow = !this.isShow
            },
            close(){
                // 销毁这个控制台的使用，使用生命周期钩子销毁函数，但有bug
                this.$destroy()
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
        height: 50%;
        width: 80%;
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