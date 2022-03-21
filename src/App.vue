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
// import Term from "./components/Term"
import ConsoleWindow from './components/ConsoleWindow';
import Desktop from './components/Desktop'
import Login from './components/Login'
import DeskTest from './components/DeskTest.vue'
import Software from './components/Software.vue';
  export default {
    name:"App",
    components:{ConsoleWindow,Desktop,Login,DeskTest, Software},
  };
</script>
<style scoped>
</style>