<template>
    <div class="basic">
        <div v-for="(theme,index) in themeColor" :key="index" class="theme" @click="bubbling">
            <el-image
                :src="require('../assets/'+theme.url)"
                fit="fill">
            </el-image> 
        </div>
    </div> 
</template>

<script>
    export default {
        name:'Theme',
        data() {
            return {
                themeColor:[
                    {
                        url:'desktop.png'
                    },
                    {
                        url:'img2.png'
                    },
                    {
                        url:'img.png'
                    },
                    {
                        url:'img4.png'
                    },
                    {
                        url:'img5.png'
                    },
                    {
                        url:'img3.png'
                    }
                ]
            }
        },
        methods:{
            bubbling(e) {
                // console.log(e.target.src)
                this.$emit('getTheme', e.target.src)
                // console.log(e)
                // var bg = e.target.parentElement
                // console.log(bg.style.backgroundColor)
            }
        }
    }
</script>

<style scoped>
    .basic{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
        align-content:flex-end;
        width: 33rem;
        background-color: rgb(255, 255, 255);
    }
    .theme{
        margin-top: 10px;
        margin-bottom: 15px;
        height: 50px;
        width: 100px;
    }
    .theme:hover{
        opacity: 0.4;
    }
    .theme:active{
        opacity: 0.4;
        background-color: aquamarine;
    }
</style>