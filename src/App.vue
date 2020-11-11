<template>
  <div id="app" style="display: flex; flex-direction: column; height: 100vh">
        <header-view />
              <div>
                <div
                  style="display: flex; align-items: center; cursor: pointer"
                  class="pb-1 border-bottom"
                  @click="loadedContact = null"
                >
                  <i
                    class="mdi mdi-chevron-left"
                    style="line-height: 35px; font-size: 35px"
                  ></i>
                  <b-avatar class="bg-secondary"></b-avatar>
                  <div class=" " style="flex: 1; display: flex">
                    <div
                      class="text-left pl-2"
                      style="flex: 1; display: flex; flex-direction: column"
                    >
                      <span class="font-weight-bold">{{
                        loadedContact.name
                      }}</span>
                      <span class="text-muted"
                        >status . Last seen 2 hour ago</span
                      >
                    </div>
                  </div>
                </div>
              </div>
    <Profile/>
    
  </div>
</template>

<script>
import headerView from "@/components/header";
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
