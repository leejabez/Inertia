<template>
  <div>
    <div class="hero mb-3">
      <b-container fluid>
        <b-row
          class="align-content-center justify-content-center column"
          style="max-height: 520px; height: 520px"
        >
          <b-col class="text-left display-4 font-weight-bold">
            Your Mental Health <br />
            Matters</b-col
          >
        </b-row>
      </b-container>
    </div>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6" class="text-left py-4">
          <p class="text-left">
            Inertia is a way for you to keep track of your mental health and
            provides a platform for you to interact and communicate with new
            people every day!
          </p>
          <b-button class="nav_btn px-5" to="/signup"> Signup </b-button>
        </b-col>
        <b-col cols="6" class="p-4 d-none d-md-block">
          <b-img :src="home_img" style="margin-top: -200px"></b-img>
        </b-col>
      </b-row>
    </b-container>
    <footer-view/>
  </div>
</template>

<script>
import footerView from "@/components/footer";

export default {
  data() {
    return {
      home_img: require("@/assets/home_img.png"),
    };
  },
  components: {
    footerView,
  },
};
</script>

<style>
.hero {
  background-image: url("../../assets/gradient.png");
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