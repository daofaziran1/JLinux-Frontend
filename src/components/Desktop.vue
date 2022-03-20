<template>
    <!-- <div class="basic"> -->
    <div :style="styleObj"  class="basicDesktop"> 
        <!-- <div  class="basic"> -->
        <Top></Top>
        <DeskBody></DeskBody>
        <TaskBoard></TaskBoard>
    </div>
</template>
<script>
import Top from './Top'
import DeskBody from './DeskBody'
import TaskBoard from './TaskBoard'
    export default {
        name:'Desktop',
        data() {
            return {
                styleObj: {
                    width:screen.availWidth+'px',
                    height:screen.availHeight+'px'
                }
            }
        },
        components:{Top,DeskBody,TaskBoard},
    }
</script>

<style scoped>
    .basicDesktop{
        display: flex;
        flex-direction: column ;
        justify-content: flex-start;
    }
</style>>