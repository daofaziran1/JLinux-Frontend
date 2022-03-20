<template>
    <div class="basicDeskBody">
        <Menu></Menu>
        <Desk></Desk>
    </div>
</template>

<script>
import Menu from './Menu.vue'
import Desk from './Desk.vue'
    export default {
        name:"DeskBody",
        components:{Menu,Desk}
    }
</script>

<style scoped>
    .basicDeskBody{
        background-color: blueviolet;
        width: 100%;
        height: 77.4%;
        opacity: 0.8;
        border-radius:5px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
    }
</style>>
