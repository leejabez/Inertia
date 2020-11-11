<template>
  <div  class="border-top   ">
    <b-navbar toggleable="sm" type="light" variant="white">
      <b-navbar-brand to="/">
        <b-img :src="logo"></b-img>
      </b-navbar-brand>

      <div class="pl-5 w-100 text-left">
        <span
          v-for="(v, k) in links"
          @click="$router.push(v.path)"
          :key="k"
          style="cursor: pointer"
          :class="['nav_item mx-4', { nav_item_active: $route.path == v.path }]"
          >{{ v.name }}</span
        >
        <span class="float-right">
          Copyright © 2020. Inertia. All rights reserved.
        </span>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.nav_item {
  color: #000000 !important;
}
.nav_item_active {
  color: #000000 !important;
  font-weight: 700;
}
.nav_btn {
  background: #0094b6 !important;
}
</style>