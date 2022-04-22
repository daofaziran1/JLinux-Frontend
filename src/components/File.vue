<template>
    <!-- <div> -->
        <el-container v-if="show">
            <el-header height="42px">
                <div class="menu">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        >
                        <el-button type="primary" icon="el-icon-upload" round>上传</el-button>
                    </el-upload>
                    <el-button type="primary" icon="el-icon-folder-add" round plain>新建文件夹</el-button>
                    <el-button type="primary" icon="el-icon-document-add" round plain>新建文件</el-button>
                </div>
                <el-button-group>
                    <el-button  icon="el-icon-minus" @click="changeShow"></el-button>
                    <el-button  icon="el-icon-close"  @click="changeShow"></el-button>
                </el-button-group>
            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="6">
                            <el-tooltip class="item" effect="light" content="路径：/root" placement="bottom">
                                <div class="file" >
                                    <el-image
                                    style="width: 100px; height: 100px"
                                    :src="require('../assets/fileDir.png')"
                                    fit="scale-down">
                                    </el-image>
                                    <span>root</span>
                                </div>
                            </el-tooltip>
                    </el-col>
                    <el-col :span="6">
                        <el-tooltip class="item" effect="light" content="路径：/etc" placement="bottom">
                            <div class="file">
                                <el-image
                                    style="width: 100px; height: 100px"
                                    :src="require('../assets/fileDir.png')"
                                    fit="scale-down">
                                </el-image>
                                <span>etc</span>
                            </div>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="6">
                        <el-tooltip class="item" effect="light" content="路径：/data" placement="bottom">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/fileDir.png')"
                                fit="scale-down">
                            </el-image>
                            <span>data</span>
                        </div>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="6">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/file.png')"
                                fit="scale-down">
                            </el-image>
                            <span>host</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/file.png')"
                                fit="scale-down">
                            </el-image>
                            <span>bb</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-tooltip class="item" effect="light" content="路径：/home" placement="bottom">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/fileDir.png')"
                                fit="scale-down">
                            </el-image>
                            <span>home</span>
                        </div>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="6">
                        <el-tooltip class="item" effect="light" content="路径：/opt" placement="bottom">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/fileDir.png')"
                                fit="scale-down">
                            </el-image>
                            <span>opt</span>
                        </div>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="6">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/file.png')"
                                fit="scale-down">
                            </el-image>
                            <span>aa</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-tooltip class="item" effect="light" content="路径：/Temp" placement="bottom">
                        <div class="file">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="require('../assets/fileDir.png')"
                                fit="scale-down">
                            </el-image>
                            <span>Temp</span>
                        </div>
                        </el-tooltip>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    <!-- </div> -->
</template>

<script>
    export default {
        name:'File',
            data() {
                return {
                   show:true
                };
        },
    methods: {
        changeShow(){
            console.log("file组件："+this.show)
            this.show = !this.show
            console.log("file组件："+this.show)
        },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
    }
</script>

<style scoped>
    .el-container{
        width: 60%;
        height: 60%;
        border:1px solid #cccccc;
        opacity: 0.7;
    }
    .menu{
        background-color: rgb(255, 255, 255);
    }
    .menu .el-button{
        width: 150px;
        margin-top:0;
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
    /* .el-button-group{
                        background-color:rgb(255, 255, 255);
    } */
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
</style>