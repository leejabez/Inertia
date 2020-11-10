<template>
  <b-overlay>
    <b-container fluid>
      <b-row class="justify-content-center">
      <!-- Back button from here -->
      <b-col cols="12">
          <div class="my-4">
            <b-btn
              class="back_btn float-left"
              style=""
            >
              <i class="mdi mdi-keyboard-backspace"></i>
            </b-btn>
          </div>
        </b-col>
      <!-- Back button to here -->

      <!-- Name + Add Friend Button from here -->
        <b-col cols="12" md="4">
          <div>
            <div class="profile_pic mx-auto"></div>
            <p class="font-weight-bold mt-2">Anna</p>
            <b-btn
              @click="handleAddFriend"
              :disabled="sent"
              class="font-weight-bold bg-fer text-capitalize w-100 rounded-pill"
            >
              Add Friend
            </b-btn>
          </div>
        </b-col>
      <!-- Name + Add Friend button to here -->
          <!-- Profile page description from here-->
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
          <!-- Profile page description to here-->
      </b-row>
    </b-container>
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      profile: null,
      loading: false,
      sent: false,
      characteristics: [
        {
          title: "Age",
          text: "21",
        },
        {
          title: "Bio",
          text:
            " lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
        {
          title: "Hobbies",
          text:
            "   . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        },
        {
          title: "Interestes",
          text:
            "   . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet . lorem ipsum dolor sit amet .",
        }
      ]
    };
  },
  methods: {
    handleAddFriend() {
      if (this.getUser) {
        var t = this;
        this.loading = true;
        var batch = this.$fb.firestore().batch();
        
        
        
        batch.commit().then(function () {
          t.loading = false;
          t.sent = true;
          alert("Friend Request Sent !");
        });

      } else {
        alert("Please login to continue")
      }
    }
  }
  
};
</script>

<style>
.back_btn {
  width: 93px;
  background: #0094b6;
  border-radius: 30px;
}
</style>