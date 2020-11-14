<template>
  <div style="position: sticky; top: 0; z-index: 99" class="border-bottom">
    <b-navbar toggleable="lg" type="light" variant="white" class=" ">
      <b-navbar-brand to="/">
        <b-img :src="logowithname"></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="pl-5">
          <template v-for="(v, k) in links">
            <b-nav-item
              v-if="(v.auth && getUser) || !v.auth"
              :to="v.path"
              :key="k"
              :class="['nav_item', { nav_item_active: $route.path == v.path }]"
              >{{ v.name }}</b-nav-item
            >
          </template>
        </b-navbar-nav>

        <!-- if logged in -->
        <b-navbar-nav class="ml-auto" v-if="getUser">
          <b-nav-item href="#">
            <b-dropdown
              id="request-dropdown"
              text="Requests"
              variant="white"
              no-caret
              class="mx-md-2"
              lazy
            >
              <template v-if="requests.length">
                <b-dropdown-item v-for="(v, k) in requests" :key="k">
                  <div v-if="!v.requested && !v.is_approved">
                      <div>
                        <div>
                          <span class="float-left h6 font-weight-bold">
                            {{ v.name }}
                          </span>
                          <span class="float-right text-muted">
                            {{
                              v.requested_on.toDate().getDay() +
                              "/" +
                              v.requested_on.toDate().getMonth() +
                              "/" +
                              v.requested_on.toDate().getFullYear()
                            }}
                          </span>
                        </div>
                        <div class="d-flex justify-content-around w-100">
                          <b-btn
                            class="rounded-pill"
                            size="sm"
                            variant="primary"
                            @click="accept(v)"
                          >
                            Accept
                          </b-btn>
                          <b-btn
                            class="rounded-pill"
                            size="sm"
                            variant="danger"
                            @click="reject(v)"
                          >
                            Reject
                          </b-btn>
                        </div>
                      </div>
                      <br />
                      </div>
                </b-dropdown-item>
              </template>
              <template v-else>
                <b-dropdown-item v-if="!noRequest">
                  loading ....
                </b-dropdown-item>
                <b-dropdown-item v-else> No Friend Request </b-dropdown-item>
              </template>
            </b-dropdown>
          </b-nav-item>
          <b-nav-item to="/dashboard/customize_profile"
            >{{ getUser.name || "" }}
            &nbsp;&nbsp;&nbsp;
            <b-avatar
              :src="getUser.profile_pic_url || defaultProfilePic"
            ></b-avatar>
          </b-nav-item>
          <b-nav-item>
            <b-button @click="signout"> Signout </b-button>
          </b-nav-item>
        </b-navbar-nav>
        <!-- if not logged in -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <b-button
              class="nav_btn px-5"
              to="/login"
              v-if="$route.path !== '/login'"
            >
              Login
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      links: [
        { path: "/resources", name: "Resources" },
        { path: "/dashboard/chat", name: "Chat" },
        { path: "/dashboard/journal", name: "Journal", auth: true },
        { path: "/discover", name: "Discover" },
        { path: "/dashboard", name: "Health", auth: true },
      ],
      requests: [],
      noRequest: false,
      logowithname: require("@/assets/logowithname.png")
    }
  },
  computed: {
    ...mapGetters(["getRequests"]),
  },
  mounted() {
    this.$nextTick(() => {
      var t = this;
      this.$root.$on("bv::dropdown::show", (bvEvent) => {
        if (bvEvent.componentId == "request-dropdown") {
          if (!t.getRequests.length) {
            t.loadRequests();
          } else {
            t.loadingRequests = false;
          }
        }
      });
    });
  },
  methods: {
    signout() {
      this.$fb.auth().signOut();
    },
    
    loadRequests() {
      var t = this;
      this.loadingRequests = true;
      this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        
        .collection("friends")
        .where("is_approved", "==", false)
        .onSnapshot((friends) => {
          var arr = [];
          friends.forEach((f) => {
            arr.push(f.data());
          });
          t.requests = arr;
          if (arr.length == 0) {
            t.noRequest = true;
          } else {
            t.noRequest = false;
          }
          t.loadingRequests = false;
        })
        .catch(() => {
          alert("Unable to load friend requests");
        });
    },
    
    accept(r) {
      var batch = this.$fb.firestore().batch();

      var requestedTo = this.$fb
        .firestore()
        .collection("users")
        .doc(r.uid)
        .collection("friends")
        .doc(this.getUser.uid);

      var requestedBy = this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        .collection("friends")
        .doc(r.uid);

      batch.update(requestedTo, {
        is_approved: true,
      });
      batch.update(requestedBy, {
        is_approved: true,
      });

      // Commit the batch
      batch
        .commit()
        .then(() => {
          alert("request approved successfully ! you can now start chatting");
        })
        .catch(() => {
          alert("unexpected error in request approve !");
        });
    },

    reject(r) {
      this.$fb
        .firestore()
        .collection("users")
        .doc(this.getUser.uid)
        .collection("friends")
        .doc(r.uid)
        .delete()
        .then(() => {
          alert("Request rejected successfully ! ");
        })
        .catch(() => {
          alert("unexpected error in request rejection !");
        });
    },
  }
    
}
</script>

<style lang="scss">
.nav_item a {
  color: #0094b6 !important;
}
.nav_item_active a {
  color: #000000 !important;
  font-weight: 700;
}
.nav_btn {
  background: #0094b6 !important;
}
#request-dropdown {
}
</style>