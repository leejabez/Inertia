<template>
  <div
    class="discover text-left text-white"
    style="display: flex; flex-direction: column"
  >
    <b-container fluid class=" " style="flex: 1; overflow-y: auto">
      <b-row>
        <b-col cols="12" class="pt-5 pb-3 pl-5">
          <h2 class="font-weight-bold">Discover.</h2>
        </b-col>
        <b-col cols="12">
          <b-container>
            <b-row>
              <template v-for="(v, k) in allUsers">
                <b-col
                  v-if="(getUser && v.uid !== getUser.uid) || !getUser"
                  cols="6"
                  md="4"
                  lg="4"
                  xl="3"
                  class="mb-4 text-center"
                  :key="k"
                >
             
                  <div
                    @click="loadProfile(v)"
                    style="cursor: pointer"
                    class="profile_pic mx-auto"
                    :style="{
                      'background-image': `url(${
                        v.profile_pic_url || defaultProfilePic
                      }   ) `,
                    }"
                  ></div>
                  <p
                    @click="loadProfile(v)"
                    style="cursor: pointer"
                    class="font-weight-bold mt-2"
                  >
                    {{ v.name }}
                  </p>
                </b-col>
              </template>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allUsers: [],
  
    };
  },
  methods: {
    loadProfile(p) {
      this.$store.commit("setLoadedProfile", p);
      this.$router.push("/profile");
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$fb
        .firestore()
        .collection("users")
        .get()
        .then((users) => {
          var arr = [];
          users.forEach((user) => {
            arr.push(user.data());
          });
          console.log(arr);
          this.allUsers = arr;
        });
    });
  },
};
</script>

<style>
.discover {
  background: url("../assets/discover.png") no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
.profile_pic {
  width: 170px;
  height: 170px; 
  background-position: center;
  background-size: cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 45px;
}
</style>