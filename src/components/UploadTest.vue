<template>
  <div>
        <el-upload
            class="upload-demo"
            ref="upload"
                :action="url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-change="handleChange"
                :data="fileInfo"
                :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
  </div>
</template>

<script>
export default {
    name:'UploadTest',
    data() {
        return {
            fileList: [],
            url:'api/upload',
            fileInfo:{
                time:BigInt,
                token:'',
                command: 'rz',
            }
        };
    },
    methods: {
        handleChange(file, fileList){
            console.log(file,fileList)
            this.time = new Date().getTime()

            // var reader = new FileReader()
            // reader.readAsArrayBuffer(file.raw)
            
            // reader.addEventListener("load", function () {
            //     console.log(reader.result);
            // }, false);
            // reader
            // console.log(reader);

        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log("handleRemove```````````````");
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log("handlePreview```````````````");
            console.log(file);
        }
    }
}
</script>

<style>

</style>