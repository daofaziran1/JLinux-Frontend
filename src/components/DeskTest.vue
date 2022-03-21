<template>
    <div id="deskBasic">
        <el-container>
            <el-header :height="headerHeight">
                <span>{{dateTime}}</span>
            </el-header>
            <el-container>
                <el-aside :width="asideWidth">
                  <Software></Software>
                  <Software></Software>
                  <Software></Software>
                </el-aside>
                <el-container>
                    <el-main>
                      <ConsoleWindow/>
                    </el-main>
                    <el-footer :height="footerHeight">
                        <Tab></Tab> 
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import dayjs from "dayjs"
import Software from './Software.vue'
import ConsoleWindow from './ConsoleWindow'
import Tab from './Tab.vue'
    export default {
        name:'DeskTest',
        data(){
          return {
            dateTime:"",
            timer:null,
            headerHeight:window.innerHeight*0.04+'px',
            asideWidth:window.innerWidth*0.05+'px',
            footerHeight:window.innerHeight*0.06+'px'
          }
        },
        computed: {
            termShow() {
                return Vue.state.termShow
            },
            tabShow() {
                return Vue.state.tabShow
            }
        },
        components:{Software,ConsoleWindow,Tab},
        created() {
          // console.log('屏幕可用高宽 '+screen.availHeight+' '+ screen.availWidth);
          // console.log('屏幕高宽 '+screen.Height+' '+ screen.Width);
          // console.log('浏览器高宽 '+window.outerHeight+" "+ window.outerWidth)
          // console.log('浏览器可用高宽 '+window.innerHeight+" "+ window.innerWidth)
          // console.log('body宽高 '+body.offsetHeight+" "+body.offsetWidth);
          // console.log('body宽高 '+body.clientHeight+" "+body.clientWidth);
        },
        mounted() {
          // 开启一个定时器，使页面的时间能够实时变化
          this.timer = setInterval(() => {
              this.dateTime = dayjs().format("YYYY年MM月DD日 dddd HH:mm:ss")
          },144)
        },
        beforeDestroy() {
            //  销毁前关闭定时器
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>
  #deskBasic{
    height: 722px;
    width:1536px;
    background-image: url('../assets/desktop.png');
  }
  .el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
    /* opacity: 0.9; */
  }
  .el-header{
    background-color: #232425;
    color: rgb(233, 224, 224);
    text-align: center;
    height: 1%;
    opacity: 0.4;
    border-radius:5px;

  } 
  .el-footer {
    background-color: #242629;
    color: #333;
    padding: 0px;
    /* text-align: center; */
    opacity: 0.4;
    border-radius:5px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    /* text-align: center;
    align-items: center; */
  }
  
  .el-aside {
    background-color: #3c3d3f;
    color: #333;
    text-align: center;
    opacity: 0.9;
    border-radius:5px;
  }
  
  .el-main {
    /* color: #333; */
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
</style>