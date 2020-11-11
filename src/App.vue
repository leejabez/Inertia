<template>
  <div id="app" style="display: flex; flex-direction: column; height: 100vh">
    <Profile/>
    
  </div>
</template>

<script>
import Profile from './pages/Profile.vue'
export default {
  name: "App",
  components: {
    Profile
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.8.55/css/materialdesignicons.min.css');
@import url("./assets/scss/custom.scss");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg-fer {
  background-color: #0094b6 !important;
}
.text-fer {
  color: #0094b6 !important;
}
</style>
