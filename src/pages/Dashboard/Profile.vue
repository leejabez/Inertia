<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="py-4 d-flex justify-content-center">
        <div
          class="profile_pic_customize"
          :style="{
            'background-image': `url(${
              getUser.profile_pic_url || defaultProfilePic
            })`,
          }"
        >
        <i
            class="mdi mdi-camera change_pic_icon"
            @click="showUpload = !showUpload"
          ></i>
        </div>
      </b-col>
      <b-col cols="12">
        <b-container>
          <b-row class="justify-content-center">
            <b-col cols="12" md="6" class="my-3">
              <b-input
                v-model="name"
                placeholder="Your Name "
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-input>
            </b-col>
            <b-col cols="12" md="6" class="my-3">
              <b-input
                v-model="age"
                type="number"
                placeholder="Your Age "
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-input>
            </b-col>

            <b-col cols="12" md="12" class="my-3">
              <b-input
                v-model="bio"
                placeholder="Bio"
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-input>
            </b-col>
            <b-col cols="12" md="12" class="my-3">
              <b-textarea
                v-model="hobbies"
                placeholder="Your Hobbies"
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-textarea>
            </b-col>
            <b-col cols="12" md="12" class="my-3">
              <b-textarea
                v-model="interests"
                placeholder="Your Interests"
                class="w-100 rounded-0"
                @input="isChanged = true"
              ></b-textarea>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
       <b-col cols="12" class="d-flex justify-content-center">
        <div class="col-8 col-md-4">
          <b-overlay :show="loading" class="w-100">
            <b-button
              @click="save"
              variant="primary"
              class="w-100 rounded-0"
              :disabled="loading || !isChanged"
            >
              Save Changes
            </b-button>
          </b-overlay>
        </div>
      </b-col>
    <b-row>
        <profile-component
      :showPopup="showUpload"
      @uploaded="uploadProfilePic"
      @toggle="showUpload = $event"
    ></profile-component>
  </b-container>
</template>

<script>
import profileComponent from "../../components/profilePic";
export default {
  data() {
        return {
        showUpload: false,
        isChanged: false,
        name: null,
        age: null,
        bio: null,
        hobbies: null,
        interests: null,
        loading: false,
        }
    },
    components: {
        profileComponent,
    },
    methods: {
    save() {
      this.loading = true;
      var o = {
        name: this.name,
        age: this.age,
        bio: this.bio,
        hobbies: this.hobbies,
        interests: this.interests,
      };
      this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        .update(o)
        .then(() => {
          this.loading = false;
          this.isChanged = false;
          this.$bvToast.toast(` Updated Successfully `, {
            title: `Your Profile is updated ! `,
            autoHideDelay: 10000,
            variant: "success",
            appendToast: true,
          });
        })
        .catch((err) => {
          this.loading = false;
          this.$bvToast.toast(` An error while  Updating your profile `, {
            title: err.message,
            autoHideDelay: 10000,
            variant: "danger",
            appendToast: true,
          });
        });
      },
    uploadProfilePic(e) {
      console.log("asdadsads");
      console.log(e);
      var that = this;

      var uploadTask = this.$fb
        .storage()
        .ref("users/" + this.getUser.uid + "profile_pic")
        .putString(e,'data_url');
      uploadTask.on(
        "state_changed",
        function () {},
        function (error) {
          alert("error while uploading image " + error);
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            that.$fb
              .firestore()
              .collection("users")
              .doc(that.getUser.uid)
              .update({
                profile_pic_url: downloadURL,
              });
          });
        }
      );   
    },
    mounted() {
    this.$nextTick(() => {
      this.name = this.getUser.name || null;
      this.age = this.getUser.age || null;
      this.bio = this.getUser.bio || null;
      this.hobbies = this.getUser.hobbies || null;
      this.interests = this.getUser.interests || null;
    });
    },
  }
}
</script>

<style>
.profile_pic_customize {  
  display: flex;
  justify-content: center;
  align-items: center
}
</style>