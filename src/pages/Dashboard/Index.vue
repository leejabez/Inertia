<template>
  <div style="background: #f8f8fb; height: 100%; min-height: 100vh">
                  <b-container class="text-left">
      <b-row class="py-4">
        <b-col cols="12" class="pb-4">
          <h2 style="color: #f9397e">
            <span class="text-capitalize"> {{ getUser.name }} </span>'s Health
            <span stye="color:#F980ED"> <i class="mdi mdi-heart"></i></span>
          </h2>
        </b-col>
        <b-col cols="12" md="8">
          <b-container>
            <b-row>
              <b-col cols="12" md="6" lg="6" xl="6" class="py-3">
                <div class="dashboard_card d-flex">
                  <div>
                    <b-avatar
                      style="
                        background: rgba(113, 59, 219, 0.05);
                        color: #6F52ED;
                      "
                    ></b-avatar>
                  </div>
                  <div class="pl-3 pt-2">
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 28px;
                        line-height: 24px;
                        letter-spacing: 0.01em;
                        color: #2e3b52;
                      "
                      >{{ frndsList.length }}</span
                    >
                    <br />
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        letter-spacing: 0.01em;
                        color: #a6acbe;
                      "
                      >Friends</span>
                  </div>
                </div>
              </b-col>
              <b-col cols="12" md="6" lg="6" xl="6" class="py-3">
                <div class="dashboard_card d-flex">
                  <div>
                    <b-avatar
                      style="
                        background: rgba(51, 214, 159, 0.07);
                        color: rgba(51, 214, 159);
                      "
                    >
                      <i
                        class="mdi mdi-account-multiple-plus"
                        style="font-size: 28px; line-height: 28px"
                      ></i>
                    </b-avatar>
                  </div>
                  <div class="pl-3 pt-2">
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 28px;
                        line-height: 24px;
                        letter-spacing: 0.01em;
                        color: #2e3b52;
                      "
                      >{{ getRequests.length }}</span
                    >
                    <br />
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        letter-spacing: 0.01em;
                        color: #a6acbe;
                      "
                      >Friend Request</span
                    >
                  </div>
                </div>
              </b-col>
              <b-col cols="12" md="6" lg="6" xl="6" class="py-3">
                <div class="dashboard_card d-flex">
                  <div>
                    <b-avatar
                      style="
                        background: rgba(76, 184, 255, 0.07);
                        color: rgba(76, 184, 255);
                      "
                    >
                      <i
                        class="mdi mdi-cellphone-message"
                        style="font-size: 28px; line-height: 28px"
                      ></i>
                    </b-avatar>
                  </div>
                  <div class="pl-3 pt-2">
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 28px;
                        line-height: 24px;
                        letter-spacing: 0.01em;
                        color: #2e3b52;
                      "
                      >{{ getUser.sent || 0 }}</span
                    >
                    <br />
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        letter-spacing: 0.01em;
                        color: #a6acbe;
                      "
                      >Sent Messages</span
                    >
                  </div>
                </div>
              </b-col>
               <b-col cols="12" md="6" lg="6" xl="6" class="py-3">
                <div class="dashboard_card d-flex">
                  <div>
                    <b-avatar
                      style="
                        background: rgba(255, 184, 0, 0.07);
                        color: rgba(255, 184, 0);
                      "
                    >
                      <i
                        class="mdi mdi-message-arrow-right-outline"
                        style="font-size: 28px; line-height: 28px"
                      ></i>
                    </b-avatar>
                  </div>
                  <div class="pl-3 pt-2">
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 28px;
                        line-height: 24px;
                        letter-spacing: 0.01em;
                        color: #2e3b52;
                      "
                      >{{ getUser.received || 0 }}</span
                    >
                    <br />
                    <span
                      style="
                        font-family: Heebo;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        letter-spacing: 0.01em;
                        color: #a6acbe;
                      "
                      >Received messages</span
                    >
                  </div>
                </div>
              </b-col>
                               </b-row>
          </b-container>
        </b-col>
         <b-col cols="12" md="4">
          <!-- base -->
          <b-overlay :show="loading" class="frnds_list my-3">
            <!-- head -->
            <div class="frnds_list_head pl-4 border-bottom">
              <h4>
                <i class="mdi mdi-account-group"></i>
                <span class="pl-2">Friends</span>
              </h4>
            </div>
                      
      </div>
</template>

<script>
export default {
    components: {
    healthChart,
  },

  data() {
    return {
      loading: false,
      series: [1, 2, 3, 4, 5, 3, 2, 5],
      labels: ["asd", "asd", "asd", "asd", "asd", "asd", "asd", "asd"],
      options: {
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },

        dataLabels: {
          enabled: false,
        },

        xaxis: {
          categories: [],
        },
      },
      frndsList: [],
    };
  },
  methods: {
    loadMore() {
      if (this.frndsList.length != this.getFriendsList.length)
        this.frndsList = this.frndsList.concat(
          this.getFriendsList.slice(this.frndsList.length, 10).map((i) => {
            return i;
          })
        );
    },   
    toggleBlockFriend(v) {
      this.loading = true;
      var val = v.blocked_by_me != null ? !v.blocked_by_me : true;
      var batch = this.$fb.firestore().batch();
      var frndRef = this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        .collection("friends")
        .doc(v.uid);

      var frndToBeBlockedRef = this.$fb
        .firestore()
        .collection("users")
        .doc(v.uid)
        .collection("friends")
        .doc(this.getUser.uid);
      batch.update(frndRef, {
        blocked_by_me: val,
      });
      batch.update(frndToBeBlockedRef, {
        blocked_by_friend: val,
      });

      batch
        .commit()
        .then(() => {
          this.$bvToast.toast(
            `Friend ${!val ? "Un Blocked" : "Blocked"}   Successfully`,
            {
              title: `The Friend Has been ${
                !val ? "Un Blocked" : "Blocked"
              }  ! `,
              autoHideDelay: 5000,
              variant: "success",
              appendToast: true,
            }
          );
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          alert("An Error occured while deleting friend " + err.message);
        });
    },
 deleteFriend(v) {
      this.loading = true;
      var batch = this.$fb.firestore().batch();
      var frndRef = this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        .collection("friends")
        .doc(v.uid);

      var frndToBeRemovedRef = this.$fb
        .firestore()
        .collection("users")
        .doc(v.uid)
        .collection("friends")
        .doc(this.getUser.uid);
      batch.delete(frndRef);
      batch.delete(frndToBeRemovedRef);
      batch
        .commit()
        .then(() => {
          this.$bvToast.toast(`Friend Deleted Successfully`, {
            title: "The Friend Has been Deleted ! ",
            autoHideDelay: 5000,
            variant: "success",
            appendToast: true,
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          alert("An Error occured while deleting friend " + err.message);
        });
    },
  },
  computed: {
        ...mapGetters(["getFriendsList", "getRequests"]),
  },
  watch: {
    getFriendsList: {
      handler(val) {
        if (val) {
          var ss = val;
          this.frndsList = ss.slice(0, 10).map((i) => {
            return i;
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$store.dispatch("subscribeToFriendsList");
  }
}
</script>

<style>
.frnds_list {
  max-height: 569px;

  background: #ffffff;
  /* Tables */

  box-shadow: 0px 3px 6px rgba(75, 81, 91, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.frnds_list_head {
  padding: 21px 0px;
  color: #6f52ed;
}
.frnds_list_content_scroll_area {
  max-height: 420px;
  overflow: auto;
}
</style>