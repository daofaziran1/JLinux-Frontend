<template>
    <div class="soft" @dblclick="runSoft">
        <el-image
            style="width: 5rem; height: 5rem;border-radius:15px;box-shadow: 1px 1px 5px #cdcfcf"
            :src="require('../assets/terminal.png')">
        </el-image>
        <span>Terminal</span>   
    </div>
</template>

<script>
    export default {
        name:'Software',
        methods:{
            runSoft() {
                // 暂时先模拟一下双击打开，先通过控制v-show来模拟
                // 控制tab栏内的元素
                // this.$store.commit('changeTabShow')
                // //  控制控制台的展示
                // this.$store.commit('changeTermShow')
                console.log("打开了一个软件")
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