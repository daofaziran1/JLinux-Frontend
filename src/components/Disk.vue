<template>
    <el-container>
        <el-header height="50px">
            <span>
                本地磁盘状态 
            </span>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="12" class="disk-body" v-for="(item,index) in data" :key="index" style="margin-bottom:2rem">
                    <el-image
                        style="width: 80px; height: 80px"
                        :src="require('../assets/disk.png')"
                        fit="fill">
                    </el-image>
                    <div class="disk-content">
                        <span class="disk-text" style="font-size:large; color:#FFFFFF">{{item.diskName}}</span>
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="item.percentage" status="exception" :color="customColorMethod"></el-progress>
                        <span class="disk-text">{{item.diskTotal}}</span>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name:'Disk',
        data(){
        return {
            userInfo: {
                user: "",
                path: "",
                token: "",
            },
            data:[],
        }
    },
    methods:{
        init(){
            this.login()
            this.getData()
        },
        login() {
            this.$axios.post("api/login", {
                username: "root",
                password: "123456",
            }).then((res) => {
                //  获取后台数据
                this.userInfo.user = "root",
                this.userInfo.path = res.data.path,
                this.userInfo.token =  res.data.token
            })
        },
        getData(){
            this.$axios.post('api/exec',{
                token: this.userInfo.token,
                command: "systemFile",
                time: new Date().getMilliseconds(),
            }).then(
                res => {
                    let arr = res.data.res
                    var data = []
                    const num = 8
                    let length = res.data.res.length
                    let len = length/num

                    
                    for(var i=0;i<len;++i){
                        
                        var temp = {
                            percentage:0,
                            diskName:'',
                            diskTotal:''
                        }
                        // 处理数据
                        
                        temp.diskName = arr[i*num + 2].split('型')[1]
                        temp.diskTotal = arr[i*num + 4]+'， '+arr[i*num + 3]
                        
                        temp.percentage = parseFloat(arr[i*num + 6].split('率')[1].slice(0,-1))
                        data.push(temp)
                    }
                    this.data = data
                }
            )
        },
        customColorMethod(percentage) {
            if (percentage <= 60) {
                return "#67C23A";
            } else if (percentage > 60 && percentage < 80) {
                return "#E6A23C";
            } else {
                return "#F56C6C";
            }
        },
    },
    mounted(){
        this.init()
    }
}
</script>

<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .disk-body{
        display: flex;
        align-items: center;
        flex-direction: row;

    }
    .el-header{
        /* background-color: aqua; */
        font-size: xx-large;
        color: #F2F6FC;
    }
    .disk-content{
        color: #C0C4CC;
        margin-left: 10px;
    }
    .disk-text{
        display: block;
        margin-bottom: 5px;
        margin-top: 5px;
        font-size:x-small
    }
</style>