<template>
  <div id="app">
    <h1> Home Page </h1>
  </div>
</template>

<script>
import headerView from "@/components/header";

export default {
    components: {
    headerView,
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
