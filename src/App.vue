<template>
  <div>
    <ConsoleWindow></ConsoleWindow>
    <Term></Term>
  </div>
</template>
<script>
import Term from "./components/Term"
import ConsoleWindow from './components/ConsoleWindow';
export default {
  name:"App",
  components:{Term,ConsoleWindow}
};
</script>s