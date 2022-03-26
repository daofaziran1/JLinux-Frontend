<template>
    <div class="soft" @dblclick="runSoft">
        <el-image
            style="width: 4rem; height: 4rem;border-radius:15px;box-shadow: 1px 1px 5px #cdcfcf"
            :src="require('../assets/console.png')">
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
                console.log(this.$store.state.termShow)
                this.$store.commit('changeTermShow')
                console.log(this.$store.state.termShow)
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
    .soft:hover{
        background-color: #222224;

    }
</style>