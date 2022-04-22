<template>
  <div class ="console" v-if="isShow" ref="console" >
    <div class="menu" @mousedown="move" >
        <div class="consoleNum">
            <span class="num">{{info}}</span>
        </div>
        <div class="tabs">
            <span class="tab"  @click="close">X</span>
        </div>
    </div> 
    <Term></Term>
  </div>
</template>
<script>
import Term from "./Term"
    export default {
        name:'TestTerm',
        data() {
            return {
                /*
                1、isShow 与 tabHidden 同时为true时，tab栏里面的按钮加深，且展示，
                2、isShow 为false，tabHidden为true时，tab栏里面按钮不加深，且不展示
                3、当两个都false时，tab栏消失，且不展示
                */  
                info:"Terminal",
                // isShow:this.$store.state.termShow,
                // tabShow:this.$store.state.tabShow,
                // posX:0,
                // posY:0,
                isShow:true,
                offsetLeft: Number,
                offsetTop: Number
            }
        },
        mounted(){
            this.offsetLeft = this.$refs.console.offsetLeft
            this.offsetTop = this.$refs.console.offsetTop
        },
        methods:{
            close(){
                this.isShow = false
                // 销毁这个控制台的使用，使用生命周期钩子销毁函数，但有bug
                // this.$destroy()
            },
            // movePre(e){
            //     console.log("--------------------------------------");
            //     let odiv = e.target;        //获取目标元素
            //     let odivPre = e.target.parentElement 
            //     console.log(odivPre);               // 找到父元素
            //     console.log(odiv.offsetParent);// 父元素的父元素
            //     console.log(odivPre.offsetParent);// 父元素的父元素
            //     // 找到父元素
            //     // console.log(e.target.parentElement)
            //     //算出鼠标相对元素的位置
            //     console.log("当前元素相对于父元素（console）偏移距离："+odiv.offsetLeft+" "+odiv.offsetTop)
            //     console.log("父元素相对于父元素（body）偏移距离："+odivPre.offsetLeft+" "+odivPre.offsetTop)
            //     console.log("当前元素的位置"+odiv.style.left+" "+odiv.style.top)
            //     console.log("父级元素的位置"+odivPre.style.left+" "+odivPre.style.top);
            //     console.log("当前鼠标位置（body）Client："+e.clientX +"  "+e.clientY)
            //     console.log("当前鼠标位置相对于最近父级元素（console）的位置offsetX："+e.offsetX +"  "+e.offsetY)
            //     console.log(e);
            //     let disX = (e.clientX - odiv.offsetLeft);
            //     let disY = (e.clientY - odiv.offsetTop);
            //     console.log("相对位置:"+disX +" "+ disY)
            //     document.onmousemove = (e)=>{       //鼠标按下并移动的事件

            //         console.log("当前鼠标位置："+e.clientX +"  "+e.clientY)
            //         //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            //         let left = e.clientX - disX;    
            //         let top = e.clientY - disY;
                    
            //         console.log("要移动的位置:"+left +" "+ top )
            //         //绑定元素位置到posX和posY上面
            //         this.posX = left;
            //         this.posY = top;
                
            //         //移动当前元素
                     
            //         odivPre.style.left = left + 'px';
            //         odivPre.style.top = top + 'px';
            //     console.log("当前元素的位置"+odiv.style.left+" "+odiv.style.top)
            //     console.log("父级元素的位置"+odivPre.style.left+" "+odivPre.style.top);
                    
            //     };
            //     document.onmouseup = (e) => {
            //         document.onmousemove = null;
            //         document.onmouseup = null;
            //     };
            // },
            move(e){
                // console.log("--------------------------------------");
                let odiv = e.target;        //获取目标元素
                let odivPre = e.target.parentElement 
                // console.log(odivPre);               // 找到父元素
                // console.log(odiv.offsetParent);// 父元素的父元素
                // console.log(odivPre.offsetParent);// 父元素的父元素
                // 找到父元素
                // console.log(e.target.parentElement)
                //算出鼠标相对元素的位置
                // console.log("当前元素相对于父元素（console）偏移距离："+odiv.offsetLeft+" "+odiv.offsetTop)
                // console.log("父元素相对于父元素（body）偏移距离："+odivPre.offsetLeft+" "+odivPre.offsetTop)
                // console.log("当前元素的位置"+odiv.style.left+" "+odiv.style.top)
                // console.log("父级元素的位置"+odivPre.style.left+" "+odivPre.style.top);
                // console.log("当前鼠标位置（body）Client："+e.clientX +"  "+e.clientY)
                // console.log("当前鼠标位置相对于最近父级元素（console）的位置offsetX："+e.offsetX +"  "+e.offsetY)
                // console.log(e);
                // console.log(this.offsetLeft+'    '+this.offsetTop);
                // let disX = (e.clientX - odivPre.offsetLeft + this.offsetLeft );
                // let disY = (e.clientY - odivPre.offsetTop + this.offsetTop);
                let disX = (e.clientX - odivPre.offsetLeft);
                let disY = (e.clientY - odivPre.offsetTop);
                // console.log("相对位置:"+disX +" "+ disY)
                document.onmousemove = (e)=>{       //鼠标按下并移动的事件

                    // console.log("当前鼠标位置："+e.clientX +"  "+e.clientY)
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;    
                    let top = e.clientY - disY;
                    
                    // console.log("要移动的位置:"+left +" "+ top )
                    //绑定元素位置到posX和posY上面
                    // this.posX = left;
                    // this.posY = top;
                
                    //移动当前元素
                        
                    odivPre.style.left = left + 'px';
                    odivPre.style.top = top + 'px';
                // console.log("当前元素的位置"+odiv.style.left+" "+odiv.style.top)
                // console.log("父级元素的位置"+odivPre.style.left+" "+odivPre.style.top);
                    
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            } ,
        },
        components:{Term},
    }
</script>

<style>
    .console{
        /* height: 45.62rem; */
        height: 45.62rem;
        width: 49.3%;
        opacity: 0.95;
        background-color: #222222;
        position: absolute;
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
        background-color: rgb(114, 114, 114);  
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