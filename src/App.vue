<template>
  <div>
    <!-- <ConsoleWindow></ConsoleWindow> -->
    <!-- <Desktop></Desktop> -->
    <Login></Login>
  </div>
</template>
<script>
// import Term from "./components/Term"
import ConsoleWindow from './components/ConsoleWindow';
import Desktop from './components/Desktop'
import Login from './components/Login'
export default {
  name:"App",
  components:{ConsoleWindow,Desktop,Login}
};
</script>
<style scoped>
</style>