<template>
    <el-container class="basic">
        <el-aside width="10rem" class="body-aside">
            <div class="weather-today">
                <span class="weather-today-date">{{todayWeather.currentDate}}</span>
                <el-image :src="todayWeather.weatherImg" fit="scale-down" class="weather-today-img"></el-image>
                <span class="weather-today-realTimeTem">{{todayWeather.realTimeTem}}</span>
                <span class="weather-today-state">{{todayWeather.state}}</span>
                <span class="weather-today-dayTem">{{todayWeather.dayTem}}</span>

                
                <span class="weather-today-wind">{{todayWeather.wind}}</span>
                <div class="weather-today-air">   
                    <span class="weather-today-air-title">空气质量：</span>
                    <el-tag :type="todayWeather.airQuality.type">{{todayWeather.airQuality.level}}</el-tag>
                </div>
                <span class="weather-today-humidity">{{todayWeather.airHumidity}}</span>
            </div>
        </el-aside >
        <el-main class="body-main">
            <el-row :gutter="5" >
                <el-col :span="8" v-for="(weather, index) in weekWeather" :key="index" class="weather-week" :style="index < 3 ? `border-bottom: 1px solid #C0C4CC;` : ``">
                    <div class="weather-today">
                        <span class="weather-week-date">{{weather.date}}</span>
                        <el-image :src="weather.weatherImg" fit="scale-down" class="weather-week-img"></el-image>
                        <span class="weather-week-state">{{weather.wea}}</span>
                        <span class="weather-week-dayTem">{{weather.dayTem}}</span>
                        <span class="weather-week-wind">{{weather.win}}</span>
                        <span class="weather-week-wind">{{weather.win_speed}}</span>
                    </div>

                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import dayjs from "dayjs"
    export default {
        name:'Weather',
        data(){
            return {
                weekWeather:[],
                todayWeather:{
                    currentDate: '',
                    realTimeTem: '',
                    dayTem: '',
                    state:'',
                    wind: '',
                    airQuality: '',
                    airHumidity: '',
                    weatherImg: ''
                },
                todayTest:{
                    airHumidity: "空气湿度：66%",
                    airQuality: {
                        apiLower: 51,
                        apiUpper: 100,
                        level: "良好",
                        type: "",
                        air: 53
                    },
                    currentDate: "2022-05-08 星期日",
                    dayTem: "11  ~  14℃",
                    realTimeTem: "12℃",
                    state: "多云",
                    weatherImg: "/img/yunnight.03111524.png",
                    wind: "东北风 2级",
                },
                airQuality:[
                    {
                        apiLower: 0,
                        apiUpper: 50,
                        level:'优',
                        type: 'success'
                    },
                    {
                        apiLower: 51,
                        apiUpper: 100,
                        level:'良好',
                        type: ''
                    },
                    {
                        apiLower: 101,
                        apiUpper: 200,
                        level: '轻度污染',
                        type: 'info'
                    },
                    {
                        apiLower:201,
                        apiUpper:300,
                        level:'中度污染',
                        type: 'warning'
                    },
                    {
                        apiLower:300,
                        apiUpper:10000,
                        level:'重度污染',
                        type: 'danger'
                    },
                ]
            }
        },
        methods:{
            getTodayWeather(){
                this.$axios.get('https://yiketianqi.com/free/day',{
                    params:{
                        appid:'34962419',
                        appsecret:'GhNEd877',
                        vue:'1',
                    }
                }).then(
                    res => {
                        // this.todayWeather = 
                        let weather = res.data
                        // 当前天气日期
                        this.todayWeather.currentDate = weather.date + '   ' + weather.week
                        // 实时温度
                        this.todayWeather.realTimeTem = weather.tem + '℃'
                        // 今日的持续温度
                        this.todayWeather.dayTem = weather.tem_night+'  ~  '+weather.tem_day+'℃'
                        // 天气状态描述 即 weather.wea
                        this.todayWeather.state =  weather.wea
                        // 风级情况
                        this.todayWeather.wind = weather.win + ' ' + weather.win_speed
                        // 空气质量
                        this.todayWeather.airQuality = this.airQuality.filter(
                            item => {
                                let air = parseInt(weather.air)
                                return air >= item.apiLower && air <= item.apiUpper
                            }
                        )[0]
                        this.todayWeather.airQuality.air = parseInt(weather.air)
                        // 空气湿度：
                        this.todayWeather.airHumidity = '空气湿度：' + weather.humidity
                        // 天气照片
                        let imgSrc = weather.wea_img
                        if(imgSrc == 'qing' || imgSrc == 'yun'){
                            if(parseInt(dayjs().format('HH'))  > 18){
                                imgSrc+='night'
                            }
                        }
                        this.todayWeather.weatherImg = require('../assets/'+imgSrc+'.png')
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
            },
            getWeekWeather(){
                this.$axios.get('https://v0.yiketianqi.com/free/week',{
                    params:{
                        appid:'34962419',
                        appsecret:'GhNEd877',
                        vue:'1',
                    }
                }).then(
                    res => {
                        let weathers = res.data.data
                        this.weekWeather = weathers.slice(1)
                        this.weekWeather.map(
                            weather => {
                                // 日期 weather.date
                                // 图片
                                let imgSrc = weather.wea_img
                                if(imgSrc == 'qing' || imgSrc == 'yun'){
                                    if(parseInt(dayjs().format('HH'))  > 18){
                                        imgSrc+='night'
                                    }
                                }
                                weather.weatherImg = require('../assets/'+imgSrc+'.png')
                                // 温度描述 weather.wea
                                // 温度范围
                                weather.dayTem = weather.tem_night+'  ~  '+weather.tem_day+'℃'
                                // 风速
                                weather.wind = weather.win + ' ' + weather.win_speed
                                return weather
                            }
                        )
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
            },
        },
        mounted(){
            this.getTodayWeather()
            this.getWeekWeather()
        }
        
        
    }
</script>

<style scoped>
    .basic{
        height: 300px;
        /* width: 400px; */
    }
    .body-aside{
        width: 4rem;
        /* background-color: rgb(221, 154, 154); */
    }
    .body-main{
        padding: 0;
        overflow: hidden;
    }
    .weather-today{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .weather-today-date{
        font-size: 1rem;
         margin-bottom: 1rem;
    }
    .weather-today-realTimeTem{
        font-size: 3.5rem;
        margin-bottom: 1rem;
    }
    .weather-today-dayTem{
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    .weather-today-state{
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
    }
    .weather-today-wind{
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
    .weather-today-img{
        width: 64px;
        height: 64px;
        margin-bottom: 1.5rem;
    }
    .weather-today-humidity{
       font-size: 0.5rem;
              
    }
    .weather-today-air{
        margin-bottom: 0.5rem;
        margin-bottom: 1.5rem;
    }
    .weather-today-air-title{
        font-size: 0.5rem;
        
    }
    .weather-week{
        /* border-radius: 5rem; */
    }
    .weather-week-dayTem{
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
    .weather-week-date{
        font-size: 1rem;
    }
    .weather-week-img{
        width: 64px;
        height: 64px;
        margin-bottom: 0.5rem;
    }
    .weather-week-wind{
        font-size: 1rem;
        margin-bottom: 0.5rem;
        
    }
    .weather-week-state{
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
</style>