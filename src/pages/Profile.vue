
<template>
  <b-overlay :show="loading">
    <b-container fluid>
      <b-row class="justify-content-center">
        <b-col cols="12">
          <div class="my-4">
            <b-btn
              class="back_btn float-left"
              style=""
              @click="$router.replace('/discover')"
            >
              <i class="mdi mdi-keyboard-backspace"></i>
            </b-btn>
          </div>
        </b-col>
        <b-col cols="12" md="4">
          <div>
            <div
              class="profile_pic mx-auto"
              :style="{
                'background-image': `url(${
                  profile.profile_pic_url || defaultProfilePic
                })`,
              }"
            ></div>
            <p class="font-weight-bold mt-2">{{ profile.name }}</p>
            <b-btn
              @click="handleAddFriend"
              :disabled="sent"
              class="font-weight-bold bg-fer text-capitalize w-100 rounded-pill"
            >
              Add Friend
            </b-btn>
          </div>
        </b-col>
        <b-col cols="12"></b-col>
        <b-col cols="12" class="my-5 text-left">
          <b-container>
            <b-row>
              <b-col cols="12">
                <div v-for="(v, k) in characteristics" :key="k">
                  <h4 class="text-fer" style="text-decoration: underline">
                    {{ v.title }}
                  </h4>
                  <p>
                    {{ v.text }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-overlay>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      profile: null,
      loading: false,
      sent: false,
      characteristics: {
        age: {
          title: "Age",
          text: "21",
        },
        bio: {
          title: "Bio",
          text:
            " lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
        hobbies: {
          title: "Hobbies",
          text:
            "   . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
        interests: {
          title: "Interests",
          text:
            "   . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getLoadedProfile"]),
  },
  watch: {
    getLoadedProfile: {
      handler(val) {
        if (val) {
          this.profile = val;
          this.characteristics.age.text = val.age || "--";
          this.characteristics.bio.text = val.bio || "--";
          this.characteristics.hobbies.text = val.hobbies || "--";
          this.characteristics.interests.text = val.interests || "--";
        } else {
          this.$router.replace("/discover");
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleAddFriend() {
      if (this.getUser) {
        var t = this;
        this.loading = true;
        var batch = this.$fb.firestore().batch();
        var requestedTo = this.$fb
          .firestore()
          .collection("users")
          .doc(this.profile.uid)
          .collection("friends")
          .doc(this.getUser.uid);

        var requestedBy = this.$fb
          .firestore()
          .collection("users")
          .doc(this.getUser.uid)
          .collection("friends")
          .doc(this.profile.uid);

        batch.set(requestedTo, {
          is_approved: false,
          requested_on: firebase.firestore.Timestamp.fromDate(new Date()),
          uid: t.getUser.uid,
          requested: false,
          name: t.getUser.name,
          userRef: this.$fb
            .firestore()
            .collection("users")
            .doc(this.getUser.uid),
        });
        batch.set(requestedBy, {
          is_approved: false,
          requested_on: firebase.firestore.Timestamp.fromDate(new Date()),
          uid: t.profile.uid,
          requested: true,
          name: t.profile.name,
          userRef: this.$fb
            .firestore()
            .collection("users")
            .doc(this.profile.uid),
        });

        // Commit the batch
        batch.commit().then(function () {
          t.loading = false;
          t.sent = true;
          alert("Friend Request Sent!");
        });
      } else {
        alert("Login to continue");
      }
    },
  },
};
</script>

<style>
.back_btn {
  width: 93px;

  background: #0094b6;
  border-radius: 30px;
}
</style>