<template>
  <div id="main">
    <!-- <ConsoleWindow></ConsoleWindow> -->
    <!-- <Desktop></Desktop> -->
    <router-view>      
    </router-view>
    <!-- <File></File> -->
    <!-- <DeskTest></DeskTest> -->
    <!-- <Software></Software> -->
  </div>
</template>
<script>
import Login from './pages/Login'
import DeskTest from './pages/DeskTest'
// import File from './components/File.vue'
  export default {
    name:"App",
    components:{Login,DeskTest},
  };
</script>
<style scoped>
#main{
    height: 100%;
    width:100%;
    /* background-image: url('../assets/desktop.png'); */
  }
</style>