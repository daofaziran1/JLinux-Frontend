<template>
    <div class="soft" @dblclick="runSoft">
        <el-image
            style="width: 5rem; height: 5rem;border-radius:15px;box-shadow: 1px 1px 5px #cdcfcf"
            :src="require('../assets/files.png')">
        </el-image>
        <span>File</span>   
    </div>
</template>

<script>
    export default {
        name:'FileSoft',
        methods:{
            runSoft(){
                console.log('打开了文件')
            }
        }
    }
</script>

<style scoped>
    .soft{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        padding-top: 2px;
        padding-right: 3px;
        padding-bottom: 2px;
        padding-left: 3px;
        margin-top: 10px;
        margin-bottom: 10px;
        color: rgb(174, 180, 185);
    }
    span{
        margin-top: 0.5rem;
    }
    .soft:hover{
        background-color: #222224;

    }
</style>