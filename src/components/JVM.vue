<template>
    <el-container>
        <el-header height="40px">
            <span style="margin-bottom:0.5rem"> 
                {{jdk}}
            </span>
             <span style="margin-bottom:0.5rem">
                {{jvmMem}}
            </span>
            <span style="margin-bottom:0.5rem">
                {{jdkTime}}
            </span>

            <span>
                {{jvm}}
            </span>
        </el-header>
        <el-main>
            <div ref="chart" id="chart" style="width: 100%; height:360px; overflow:hidden;"></div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name:'JVM',
    data(){
        return {
            userInfo: {
                user: "",
                path: "",
                token: "",
            },
            jdk:'',
            jdkTime:'',
            jvm:'',
            jvmMem:'',
            
            jvmTotal:0,
            jvmUsed:0
        }
    },
        watch:{
        jvmTotal:{
            handler(newData,old){
                this.init()
            },
            deep:true,
        }
    },
    methods:{
        initData(){
            this.login()
            this.getData()
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
                command: "jvm",
                time: new Date().getTime(),
            }).then(
                res => {
                    let jdk = res.data.res
                    this.jdk = jdk[5] + ' , ' + jdk[6]
                    this.jdkTime = 'JDK' + jdk[7] + ' , ' + jdk[8]
                    this.jvmMem = jdk[1] + ' , ' + jdk[0]
                    this.jvm =  jdk[2] + ' , ' + jdk[4]+ ' , ' + jdk[3]
                    
                    this.jvmTotal = parseFloat(jdk[0].split(')')[1])
                    this.jvmUsed = parseFloat(jdk[2].split(')')[1])

                    console.log(this.jvmTotal,this.jvmUsed);
                }
            )
        },
        init(){
            var chartDom = this.$refs.chart;
            var myChart = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    formatter: '{a} <br/>{b}'
                },
                series: [
                    {
                    color:'rgb(195, 212, 109)',
                    name: 'JVM',
                    type: 'gauge',
                    
                    progress: {
                        show: true
                    },
                    axisLabel: {
                        color: 'rgb(255, 255, 255)',
                        distance: 5,
                        fontSize: 10
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}MB'
                    },
                    min: 0,
                    max: this.jvmTotal,
                    data: [
                        {
                            value: this.jvmUsed,
                            name: 'JVM使用内存'
                        }
                    ]
                    }
                ]
                };
            myChart.setOption(option);
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
         color: rgb(255, 255, 255);
         display: flex;
         flex-direction: column;
         font-size: 1.2rem;
         color: aliceblue;
    }
</style>