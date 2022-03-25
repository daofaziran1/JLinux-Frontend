<template>
  <div>
    <!-- <ConsoleWindow></ConsoleWindow> -->
    <!-- <Desktop></Desktop> -->
    <router-view>      
    </router-view>
    <!-- <DeskTest></DeskTest> -->
    <!-- <Software></Software> -->
  </div>
</template>
<script>
import Login from './pages/Login'
import DeskTest from './pages/DeskTest'
  export default {
    name:"App",
    components:{Login,DeskTest},
  };
</script>
<style scoped>
</style>