<template>
    <div class="basicHeader">
        <span>{{dateTime}}</span>
    </div>
</template>

<script>
import dayjs from "dayjs"
    export default {
        name:'Top',
        data() {
            return {
                dateTime:"",
                timer:null
            }
        },
        mounted() {
            // 开启一个定时器，使页面的时间能够实时变化
            this.timer = setInterval(() => {
                this.dateTime = this.dayjs().format("YYYY年MM月DD日 dddd HH:mm:ss")
            },144)
        },
        beforeDestroy() {
            //  销毁前关闭定时器
            clearInterval(this.timer)
        }
    }
</script>

<style  scoped>
    .basicHeader{
        background-color: rgb(47, 56, 71);
        height: 4%;
        width: 100%;
        /* 透明度 */
        opacity: 0.5 ;
        /* 圆角 */
        border-radius:5px;
        /* 水平垂直居中 */
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

    }
    span{
        color: rgb(219, 228, 236);
        font-size: 1.25rem;
    }
</style>