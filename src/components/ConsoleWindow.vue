<template>
  <div class ="console" v-show="isShow" >
    <div class="menu" @mousedown="move">
        <div class="consoleNum">
            <span class="num">{{info}}</span>
        </div>
        <div class="tabs">
            <span class="tab" @click="changeShow">一</span>
            <span class="tab"  @click="close">X</span>
        </div>
    </div>
    <Term></Term>
  </div>
</template>
<script>
import Term from "./Term"
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
                tabShow:this.$store.state.tabShow,
                posX:0,
                posY:0
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
            },
            move(e){
                let odiv = e.target;        //获取目标元素
                let odivPre = e.target.parentElement                // 找到父元素
                console.log(e.target === e.currentTarget);
                // 找到父元素
                console.log(e.target.parentElement)
                //算出鼠标相对元素的位置
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;

                document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;    
                    let top = e.clientY - disY;
                    
                    //绑定元素位置到posX和posY上面
                    this.posX = top;
                    this.posY = left;
                    
                    //移动当前元素
                    odivPre.style.left = left + 'px';
                    odivPre.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
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
        height: 45.6rem;
        width: 49.6%;
        opacity: 0.8;
        background-color: rgb(38, 57, 73);
        position: relative;
    }

    .menu{
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
        position: relative;
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
        display: block;
        color: white;
        text-align: center;
        padding: 8px 14px;
        text-decoration: none;
    }
    .tab:hover:not(.active){
        background-color: #848b84;
    }
</style>