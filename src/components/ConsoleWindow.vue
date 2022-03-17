<template>
  <div>
    <ul>
        <li style="float:left"><a class="active" href="#about">{{info}}</a></li>
        <li><a href="#contact">×</a></li>
        <li><a href="#news">口</a></li>
        <li><a href="#home">-</a></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name:'ConsoleWindow',
        data() {
            return {
                info:"console-1"
            }
        }
    }
</script>

<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    li {
        float: right;
    }

    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 8px 14px;
        text-decoration: none;
    }

    li a:hover:not(.active) {
        background-color: #111;
    }

    .active {
        background-color: #4CAF50;
    }
</style>