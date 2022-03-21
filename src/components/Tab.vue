<template>
    <button :style="tabHeight" v-show="tabShow">
        {{info}}
    </button>
</template>

<script>
    export default {
        name:'Tab',
        data() {
            return {
                info:'console-1',
                tabHeight:{
                    height:window.innerHeight*0.06+'px',
                    width:window.innerWidth*0.1+'px'
                }
            }
        },
        computed: {
            termShow() {
                return this.state.termShow
            },
            tabShow() {
                return this.$store.state.termShow
            }
        },
        methods:{

        }
    }
</script>

<style>
    button{
        background-color: rgb(149, 236, 207);
        border-radius: 5px;
        margin-right: 20px;
        /* margin-top: 2px; */
    }
    button:hover{
        background-color: rgb(79, 117, 105);
    }
</style>