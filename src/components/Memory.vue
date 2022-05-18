<template>
    <el-container>
        <el-header height="40px">
            <span style="margin-bottom:1rem"> 
                {{memoryDetail[0]+" , "+memoryDetail[3]}}
            </span>
            <span >
                {{memoryDetail[1]+" , "+memoryDetail[2]}}
            </span>
        </el-header>
        <el-main>
            <div ref="chart" id="chart" class="chart"></div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name:'Memory',
    data(){
        return {
            userInfo: {
                user: "",
                path: "",
                token: "",
            },
            memory:{
                total:100,
                used:0
            },
            memoryDetail:''
        }
    },
    watch:{
        memory:{
            handler (newMem, oldMem) {
				this.init()
			},
            deep:true
        },
        
    },
    methods:{
        initData(){
            this.login()
            this.getData()
            this.$nextTick(function(){
                this.init()
            })
        },
        init(){
            var chartDom = this.$refs.chart;
            var myChart = this.$echarts.init(chartDom);
            var total = this.memory.total
            var used = this.memory.used

            var option = {
                series: [
                    {
                        type: 'gauge',
                        axisLine: {
                            lineStyle: {
                            width: 30,
                            color: [
                                [0.3, '#67e0e3'],
                                [0.7, '#37a2da'],
                                [1, '#fd666d']
                            ]
                        }
                    },
                    pointer: {
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisTick: {
                        distance: -30,
                        length: 8,
                        lineStyle: {
                            color: '#fff',
                            width: 2
                        }
                    },
                    splitLine: {
                        distance: -30,
                        length: 30,
                        lineStyle: {
                            color: '#fff',
                            width: 4
                        }
                    },
                    axisLabel: {
                        color: 'auto',
                        distance: 40,
                        fontSize: 12
                    },
                    detail: {
                        fontSize:12,
                        valueAnimation: true,
                        formatter: '当前内存已使用 {value} MB',
                        color: 'auto'
                    },
                    data: [
                        {
                            value:used
                        }
                    ],
                    min: 0,
                    max: total,
                    splitNumber: 10
                    }
                ]
            };
            myChart.setOption(option);
            

            // console.log(option.series.data);
            // setInterval(() =>{
               
            // }, 2000);
        },
        login() {
            this.$axios.post("api/login", {
                username: "root",
                password: "123456",
            }).then((res) => {
                //  获取后台数据
                this.userInfo.user = "root",
                this.userInfo.path = res.data.path,
                this.userInfo.token =  res.data.token
            })
        },
        getData(){
            this.$axios.post('api/exec',{
                token: this.userInfo.token,
                command: "Mem",
                time: new Date().getTime(),
            }).then(
                res => {
                    let memory = res.data.res
                    this.memoryDetail = memory
                    this.memory.total = parseInt(memory[0].split(')')[1])
                    this.memory.used = parseInt(memory[1].split(')')[1])
                    console.log(this.memory);
                }
            )
        }
    },
    mounted(){
        this.initData()
        
    }
}
</script>

<style scoped>
    .el-header{
         /* background-color: rgb(201, 201, 201); */
         display: flex;
         flex-direction: column;
         font-size: 1.2rem;
         color: aliceblue;
    }
    .chart{
       width: 100%; 
       height:360px;
       overflow: hidden;
    }
</style>