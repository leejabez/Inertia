<template>
  <div
    class="text-center login_img"
    style="display: flex; flex-direction: column"
  >
    <b-container fluid  style="flex: 1">
      <b-row class="h-100" style="    box-shadow: inset -20px 0px 0px 0px white;">
        <b-col md="7"> </b-col>
        <b-col
          md="5"
          class="row h-100 justify-content-center bg-white align-items-center"
        >
          <b-form @submit="login" class="text-left">
            <h6>Welcome Back</h6>
            <h2 class="font-weight-bold">Login to your account</h2>
            <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Passowrd"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="password"
                type="password"
                required
                placeholder="Password"
              ></b-form-input>
            </b-form-group>

            <b-button
              type="submit"
              class="w-100 my-4"
              variant="primary"
              :disabled="loading || !isValid"
              >{{ loading ? "Logging in ..." : "Login Now" }}</b-button
            >

            <div class="text-center my-2">
              Don't have an account ?
              <router-link to="/signup">Join Today </router-link>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    <footer-view />
  </div>
</template>

<script>
import footerView from "@/components/footer";
export default {
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      home_img: require("@/assets/home_img.png"),
    };
  },
  computed: {
    isValid() {
      return this.email != null && this.password != null;
    },
  },
  components: {
    footerView,
  },
  methods: {
    reset() {
      this.loading = false;
      this.email = null;
      this.password = null;
    },
    login(e) {
      e.preventDefault();
      this.loading = true;
      this.$fb
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
    this.$router.push("/dashboard");
          this.reset();
        })
        .catch((err) => {
          alert(err);
          this.reset();
        });
    },
  },
};
</script>

<style>
.login_img {
  background: url("../../assets/login_img.png") no-repeat;
  background-position: center;
  background-size: cover;
}
</style>