<template>
    <div class="basic">
        <el-container v-if="show" >
            <el-header height="42px">
            
                <div class="menu" >
                        <div class="menu-back">
                            <div class="menu-back-button" @click="goBack">
                                <i class="el-icon-back"></i>
                                <span>返回</span>
                            </div>
                            <div class="menu-back-title">当前地址：{{userInfo.path}}</div>
                        </div>
                        <el-upload
                            class="upload-demo"
                            action="api/upload"
                            :file-list="uploadFileList"
                            :on-change="handleChange"
                            :data="uploadFileInfo"
                            :auto-upload="true"
                            :on-success="uploadSuccess">
                            <el-button 
                                slot="trigger" 
                                size="small" 
                                type="primary" 
                                icon="el-icon-upload" 
                                class="menu-upload"
                                round 
                                plain>上传文件
                            </el-button>
                        </el-upload>
                    <el-button type="primary" icon="el-icon-folder-add" round plain @click="makeNewDir">新建文件夹</el-button>
                    <el-button type="primary" icon="el-icon-document-add" round plain @click="makeNewFile">新建文件</el-button>
                </div>
                <el-button-group>
                    <el-button  icon="el-icon-close"  @click="changeShow"></el-button>
                </el-button-group>
            </el-header>
            <el-main @oncontextmenu.prevent="rightClick()" ref="main">
                <el-row :gutter="20" >
                   
                    <el-col :span="6" v-for="(file,index) in currentFiles" :key="index" > 
                        <el-dropdown trigger="click" @command="fileRename($event,index)">
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="1">重命名</el-dropdown-item>
                                <el-dropdown-item command="2">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        
                        <div class="file" @dblclick="enterDir(file)">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="file.imgUrl"
                                fit="scale-down">
                            </el-image>
                            <span v-if="!file.isRename">{{file.fileName}}</span>
                        </div>
                        </el-dropdown>
                    </el-col>
                </el-row>
                
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Vue from 'vue';
    export default {
        name:'File',
        data() {
                return {
                    Rename:'',
                    show:true,
                    userInfo: {
                            user: "",
                            path: "",
                            token: "",
                    },
                    currentFiles:[],
                    uploadFileList: [],
                    uploadUrl:'api/upload',
                    uploadFileInfo:{
                        time:new Date().getTime(),
                        token:'',
                        command: '',
                    }
                };
        },
        methods: {
            handleChange(file, fileList){
                console.log(file,fileList)
                this.uploadFileInfo.time = new Date().getTime()
                this.uploadFileInfo.token = this.userInfo.token
                this.uploadFileInfo.command = 'rz'
            },
            uploadSuccess(response, file, fileList){
                this.$message({
                     type: 'success',
                    message: '上传成功'
                })
                this.lsCommand()
            },
            changeShow(){
                console.log("file组件："+this.show)
                this.show = !this.show
                this.$parent.$parent.$parent.$parent.$parent.fileShow = false
                console.log(this.$parent.$parent.$parent.$parent.$parent);
                console.log("file组件："+this.show)
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //
            goBack(){
                if(this.userInfo.path != '/'){
                    this.cdCommand('..')
                }
                
            },
            // 获取列表的功能点击，command是1/2，index是当前文件列表的索引
            fileRename(command,index){
                if(command == "1"){
                        this.$prompt('请输入文件名', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton:false,
                            center:true,
                        }).then(({ value }) => {
                            this.mvCommand(this.currentFiles[index].fileName,value)
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消创建'
                            });       
                        });
                }else {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        roundButton : true,
                        center: true,
                        type: 'warning'
                    }).then(() => {
                        this.rmCommand(this.currentFiles[index].fileName)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                    
                }
            },
            //右键点击
            rightClick(e){
                
                console.log("右键被禁止了吗");
            },
            // 双击进入文件命令
            enterDir(file){
                if(file.type){
                    console.log("进入了某个文件夹",file)
                    this.cdCommand(file.fileName)
                }
                
            },
            // cd命令的调用
            cdCommand(fileName){
                console.log('cd '+fileName);
                this.$axios.post('api/exec',{
                    token: this.userInfo.token,
                    command: 'cd '+fileName,
                    time: new Date().getTime(),
                }).then(
                    res => {

                        console.log(res.data.res[0]);
                        Vue.set(this.userInfo,"path",res.data.res[0])
                        this.lsCommand()
                        
                    }
                )
            },
            //创建文件夹
            makeNewDir(){
                this.$prompt('请输入文件名', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton:false,
                    center:true,
                }).then(({ value }) => {
                    this.mkdirCommand(value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消创建'
                    });       
                });
            },
            //创建文件夹 指令
            mkdirCommand(fileName){
                var cmd = "mkdir "+fileName
                this.$axios.post('api/exec',{
                    token: this.userInfo.token,
                    command: cmd,
                    time: new Date().getTime(),
                }).then(
                    res => {
                        if(res.data.msg){
                            this.lsCommand()
                            this.$message({
                                type: 'success',
                                message: '文件夹 ' +res.data.res[0]
                            });
                        }        
                    }
                )
            },
            // 新建文件
            makeNewFile(){
                this.$prompt('请输入文件名', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton:false,
                    center:true,
                }).then(({ value }) => {
                    this.touchCommand(value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消创建'
                    });       
                });
            },
            // 点击新建文件
            touchCommand(fileName){
                var cmd = "touch "+fileName
                this.$axios.post('api/exec',{
                    token: this.userInfo.token,
                    command: cmd,
                    time: new Date().getTime(),
                }).then(
                    res => {
                        if(res.data.msg){
                            this.lsCommand()
                            this.$message({
                                type: 'success',
                                message: res.data.res[0]
                            });
                        }   
                    }
                )
            },
            mvCommand(oldFile,newFileName){
               var cmd = "mv "+oldFile + ' '+newFileName
                    this.$axios.post('api/exec',{
                        token: this.userInfo.token,
                        command: cmd,
                        time: new Date().getTime(),
                    }).then(
                        res => {
                            if(res.data.msg){
                                this.lsCommand()
                                // this.$message({
                                //     type: 'success',
                                //     message: res.data.res[0]
                                // });
                            }   
                        }
                    )
            },
            rmCommand(fileName){
                var cmd = "rm -rf "+fileName
                console.log(cmd);
                this.$axios.post('api/exec',{
                    token: this.userInfo.token,
                    command: cmd,
                    time: new Date().getTime(),
                }).then(
                    res => {
                        if(res.data.status){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.lsCommand()
                        }else{
                            this.$message({
                                type: 'danger',
                                message: '删除失败'
                            });
                        }
                        
                    }
                )
            },
            // 展示路径下的所有文件
            lsCommand(){
                this.currentFiles = []
                this.$axios.post('api/exec',{
                    token: this.userInfo.token,
                    command: "ls",
                    time: new Date().getTime(),
                }).then(
                    res => {
                        let list = res.data.res
                        var fileList
                        console.log(list);
                        if(list.length > 0){
                            fileList = list
                            fileList.forEach(
                                (v) => {
                                    let filePath = v.split('\t')    
                                    var file = {}
                                    // 文件类型，true为目录，false 是文件
                                    file.type = v.slice(0,1) == "d" ? true : false
                                    // 文件图片展示
                                    
                                    if(file.type){
                                        file.imgUrl = require('../assets/fileDir.png')
                                    }else {
                                        let picMatch = new RegExp('jpg|png|jpeg|gif|bmp|svg|webp','i')
                                        let exeMatch = new RegExp('exe','i')
                                        let excelMatch = new RegExp('xlsx','i')
                                        var name = filePath[filePath.length-1]
                                        if(name.match(picMatch) != null){
                                            file.imgUrl = require('../assets/picture.png')
                                        }else if(name.match(exeMatch) != null){
                                            file.imgUrl = require('../assets/exe.png')
                                        }else if(name.match(excelMatch) != null){
                                            file.imgUrl = require('../assets/exel.png')
                                        }else{
                                            file.imgUrl = require('../assets/file.png')
                                        }
                                        
                                    }
                                    
                                    // 文件名字
                                    file.fileName =  filePath[filePath.length-1]
                                    // 文件重命名状态
                                    file.isRename = false
                                    // 文件的路径
                                    // file.path = 
                                    // console.log(file);
                                    this.currentFiles.push(file)
                            });
                        }
                    }
                )
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
                    // console.log(this.userInfo);
                    this.lsCommand()
                })
            },
        },
        mounted(){
            this.login()

        }
    }
</script>

<style scoped>
    .basic{
        height: 100%;
        width: 100%;
        /* display: flex; */
        /* justify-content: space-around; */
        align-items: center;
    }
    .el-container{
        width: 60%;
        height: 80%;
        border:1px solid #cccccc;
        opacity: 0.9;
    }
    .menu{
        background-color: rgb(255, 255, 255);
        /* background-color: rgb(119, 57, 57); */
        display: flex;

        justify-content:space-between;  
        /* width: 90%; */
    }
    .menu-upload{
        height: 3.5rem;
    }
    .menu .el-button{
        width: 11rem;
        margin-top:0;
        margin-right: 1rem;
    }
    .menu-back{
        width: 25rem;

        display: flex;
        justify-content: flex-start;
    }
    .menu-back-button{
        height: 3.5rem;
        width: 5rem;
        padding-left: 1rem;
        padding-right: 0.5rem;
        color: #606266;

        display: flex;
        align-items: center;

        font-size: x-large;
        
    }
    .menu-back-button:hover{
        background-color: #C0C4CC;
    }
    .menu-back-title{
        height: 3.5rem;
        /* width:20rem; */
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        /* background-color: rgb(136, 218, 158); */
        color: #606266;
        font-size: large;
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }
    .el-header{ 
        padding: 0;
        display: flex;
        justify-content:space-between;
        background-color:rgb(255, 255, 255);
        border-bottom:1px solid #cccccc;
    }
    .upload-demo{
        width: 150px;
        margin: 0;
        padding: 0;
    }
    .file-input{
        height: 10px;
        width: 50px;
    }
    .el-input{
        width: 7rem;
    }
    .el-input >>> .el-input__inner{
        padding: 0;
        height: 2rem;
        width: 7.5rem;
        border-radius: 0;
        text-align:center;
    }
    .el-button-group .el-button{
        width: 50px;
        margin-top:0;
    }
    .file{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgb(14, 13, 13);
    }
    .file:hover{
        background-color:#eafafb;
    }
    .windowMenu{
        width: 10%;
    }
    .el-main{
        background-color:rgb(255, 255, 255);
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
  }
  .cancelButtonClass{
      width: 20px;
  }
</style>