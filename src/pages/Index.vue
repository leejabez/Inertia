<template>
    <div>
    <logged-in-view v-if="getUser" />
    <logged-out-view v-else />
    </div>
</template>

<script>
import loggedInView from "@/components/Home/loggedIn";
import loggedOutView from "@/components/Home/loggedOut";

export default {
    data() {
    return {};
  },
      components: {
    loggedInView,
    loggedOutView,
  }
}
</script>

<style>
.hero {
  background-image: url("../assets/gradient.png");
  min-height: 520px;
  background-position-x: left;
  background-position-y: top;
  background-size: cover;
  background-repeat: no-repeat;
}

.nav_btn {
  background: #0094b6 !important;
}
</style>