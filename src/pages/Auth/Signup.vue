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
export default {
    
}
</script>

<style>
.signup_img {
  background: url("../../assets/signup_img.png") no-repeat;
  background-position: center;
  background-size: cover;
}
</style>