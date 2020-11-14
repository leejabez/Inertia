<template>
  <div
    class="text-center signup_img"
    style="display: flex; flex-direction: column"
  >
    <b-container fluid style="flex: 1">
      <b-row class="h-100" style="box-shadow: inset -20px 0px 0px 0px white">
        <b-col md="7"> </b-col>
        <b-col
          md="5"
          class="row h-100 justify-content-center bg-white align-items-center"
        >
          <b-form-group @submit="signup" class="text-left">
            <h2 class="font-weight-bold">Sign up for a free account</h2>
            <b-form-group
              id="input-group-1"
              label="Display Name"
              label-for="input-name"
            >
              <b-form-input
                id="input-name"
                v-model="name"
                type="text"
                required
                placeholder="Display Name"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-1" label="Email " label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Email  "
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Password"
              label-for="input-pass"
            >
              <b-form-input
                id="input-pass"
                v-model="password"
                type="password"
                required
                placeholder="Password"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Confirm Password"
              label-for="input-cPass"
            >
              <b-form-input
                id="input-cPass"
                v-model="cPassword"
                required
                type="password"
                placeholder=""
              ></b-form-input>
            </b-form-group>
            <b-checkbox v-model="agreed"
              >I agree with the terms and conditions</b-checkbox
            >
            <b-btn
              type="submit"
              variant="primary"
              class="w-100"
              @click="signup"
              :disabled="loading || !isValid"
              >{{ loading ? "Creating Your Account ..." : "Signup" }}</b-btn
            >
          </b-form-group>
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
      name: null,
      email: null,
      password: null,
      cPassword: null,
      agreed: false,
      loading: false,
    };
  },
  computed: {
    isValid() {
      return (
        this.name != null &&
        this.email != null &&
        this.password != null &&
        this.cPassword == this.password &&
        this.agreed
      );
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
      this.cPassword = null;
      this.name = null;
    },

    signup(e) {
      e.preventDefault();
      this.loading = true;
      var self = this;
      this.$fb
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          this.$fb
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              uid: user.user.uid,
              name: self.name,
              email: self.email,

              sent: 0,
              task_completed: 0,
              time_online: 0,
              blocked_users: 0,
            })
            .then(() => {
              self.$router.push("/dashboard");
              self.reset();
            })
            .catch((err) => {
              alert("an error occured ! " + err);
            });
        })
        .catch((err) => {
          alert(err);
          this.reset();
        });
    },
  },
};
</script>

 
