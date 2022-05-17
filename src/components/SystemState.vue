<template>
    <div class="basic">
        <el-container class="system-body">
            <el-header height="40px">
                <div class="menu">
                    <div class="consoleNum">
                        <span class="title">系统运行状态</span>
                    </div>
                    <div class="tabs" @click="closeSoft">
                        <span class="tab">X</span>
                    </div>
                </div> 
            </el-header>
            <el-container>
                <el-aside width="200px">
                     <el-menu
                        default-active="0"
                        class="el-menu-vertical-demo"
                        horizontal
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#656565"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        
                            <el-menu-item index="0" @click="open(0)">
                                <span slot="title">CPU运行状态</span>
                            </el-menu-item>

                            <el-menu-item index="1" @click="open(1)">
                                <span slot="title">运行内存状态</span>
                            </el-menu-item>

                            <el-menu-item index="2" @click="open(2)">
                                <span slot="title">JVM运行状态</span>
                            </el-menu-item>

                            <el-menu-item index="3" @click="open(3)">
                                <span slot="title">系统硬盘状态</span>
                            </el-menu-item>
                        </el-menu>
                </el-aside>
                <el-main>
                    <CPU v-if="isShow[0]"></CPU>
                    <Memory v-if="isShow[1]"></Memory>
                    <JVM v-if="isShow[2]"></JVM>
                    <Disk v-if="isShow[3]"></Disk>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Vue from 'vue';
import Empty from './Empty.vue'
import JVM from './JVM.vue';
import Disk from './Disk.vue';
import Memory from './Memory.vue'
import CPU from './CPU.vue'
    export default {
        name:'SystemState', 
        components:{Empty, JVM, Disk, CPU, Memory},
        data() {
            return {
                isShow:[true,false,false,false]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            open(index){
                let show = [false,false,false,false]
                show[index] = true
                this.isShow = show
            },
            closeSoft(){
                this.$parent.$parent.$parent.$parent.$parent.openSystemShow()
                console.log(this);
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>
    .basic{
        height: 100%;
        width: 65%;
        display: flex;
        justify-content: space-around;
        /* background-color: rgb(205, 165, 165); */
        align-items: center;
        
    }
    .system-body{
        /* width: 60%; */
        height: 80%;
        background-color: #656565;
        /* border:1px solid #cccccc; */
        opacity: 0.9;
    }
    .el-header{
        background-color: #fff;
        padding: 0;
    }
    .el-aside{
        /* border:; */
        border-right: 1px solid #cccccc;
    }
    .el-main{
        width: 100%;
        height: 100%;
    }
    .menu{
        height: 100%;
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
        text-align: center;
        /* margin-right:5px;   */
    }
    .title{
        display: block;
        color: white;
        text-align: center;
        padding: 12px 14px;
        text-decoration: none;
        font-size: large;
    }
    .tabs{
        float: right;
    }

    .tab{
        float: left;
        display: block;
        color: white;
        text-align: center;
        padding: 12px 14px;
        text-decoration: none;
    }
    .tab:hover:not(.active){
        background-color: #848b84;
    }
    .el-menu-item{
         border-bottom: 1px solid #cccccc;
         border-right: none;
    }
</style>