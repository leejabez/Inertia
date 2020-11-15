<template>
  <b-container fluid class="h-100">
    <b-row class="h-100">
      <b-col
        cols="12"
        md="4"
        lg="3"
        class="pt-4 h-100"
        style="background-color: #e5e5e5; display: flex; flex-direction: column"
      >
        <!-- eslint-disable-next-line vue/no-parsing-error -->

        <b-input placeholder="Search" class="rounded-pill search_input">
        </b-input>
        <div style="flex: 1" ref="frnds_container" class=" ">
          <div
            class="px-2"
            :style="{ height: heightForFriends + 'px', overflow: 'auto' }"
          >
            <template v-for="(v, k) in getFriendsList">
              <div
                @click="setLoaded(v)"
                title="dsads"
                :key="k"
                style="cursor: pointer"
                :class="[
                  'chat_wrapper my-3 d-flex flex-column justify-content-around',
                  { blocked_friend: v.blocked_by_me || v.blocked_by_friend },
                ]"
              >
                <div
                  style="display: flex; align-items: center"
                  class="mt-3 mx-3 mb-2"
                >
                  <b-avatar
                    badge
                    badge-left
                    badge-top
                    badge-variant="success"
                    class="bg-secondary"
                    :src="v.userData.profile_pic_url || defaultProfilePic"
                  ></b-avatar>
                  <div class=" " style="flex: 1; display: flex">
                    <div
                      class="text-left pl-2"
                      style="flex: 1; display: flex; flex-direction: column"
                    >
                      <span class="font-weight-bold">{{ v.userData.name }}</span>
                      <span class="text-muted">status</span>
                    </div>
                    <div class="d-flex align-items-center text-muted">
                      {{ formatedDate(v.last_message_at) }}
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between mx-3 mb-2">
                  <div class="font-weight-bold">{{ v.last_message }}</div>
                  <div>
                    <b-badge variant="primary" v-if="v.unread_messages" pill
                      >{{ v.unread_message }}
                    </b-badge>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </b-col>
      <b-col cols="12" md="8" lg="9" class="h-100">
        <div
          v-if="loadedContact"
          class="p-4 h-100"
          style="display: flex; flex-direction: column"
        >
          <!-- header -->
          <div>
            <div
              style="display: flex; align-items: center"
              class="px-3 pb-1 border-bottom"
            >
      
              <b-avatar
                class="bg-secondary"
                :src="loadedContact.userData.profile_pic_url || defaultProfilePic"
              ></b-avatar>
              <div class=" " style="flex: 1; display: flex">
                <div
                  class="text-left pl-2"
                  style="flex: 1; display: flex; flex-direction: column"
                >
                  <span class="font-weight-bold">{{ loadedContact.userData.name }}</span>
                  <span class="text-muted"></span>
                </div>
              </div>
            </div>
          </div>
          <!-- header end -->
          <!-- messages -->
          <div
            style="flex: 1; display: flex; flex-direction: column"
            class="px-3"
            ref="msg_container"
          >
            <!-- content -->
            <div
              :style="{ height: heightForMessages + 'px', overflow: 'auto' }"
              class="text-left"
              v-chat-scroll
            >
              <template v-for="(v, k) in loadedMessages">
                <div
                  :key="k"
                  :class="[
                    { 'text-left': v.received == true },
                    { 'text-right': v.sent == true },
                  ]"
                >
                  <div class="message_container">
                    <div
                      :class="[
                        'message_box  px-5 py-3',
                        { message_box_left: v.received == true },
                        { 'message_box_right ': v.sent == true },
                      ]"
                    >
                      {{ v.message }}
                    </div>
                    <div class="text-right text-muted">
                      {{ formatedDate(v.timestamp) }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <!-- content end -->
            <div class="text-right" ref="msg_box" style="position: relative">
              <textarea
                type="text"
                class="write_message p-4"
                placeholder="Type Message Here"
                v-model="message"
              />
              <b-button
                variant="primary"
                @click="sendMessage"
                class="rounded-circle send_btn"
                size="lg"
              >
                <i class="mdi mdi-send h6"></i>
              </b-button>
            </div>
          </div>
        </div>
        <div
          v-else
          class="p-4 h-100 justify-content-center"
          style="display: flex; flex-direction: column"
        >
          <h2 class="text-muted">
            <div>
              <i class="mdi mdi-message display-1"></i>
            </div>
            Please select a contact to start chatting
          </h2>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      heightAvailable: false,
      loadedContact: null,
      loadedMessages: [],
      message: null,
    };
  },
  computed: {
    ...mapGetters(["getFriendsList"]),
    heightForMessages() {
      if (this.heightAvailable) {
        var a = this.$refs;
        var h = 100;
        if (a.msg_container) {
          h = a.msg_container.clientHeight - a.msg_box.clientHeight;
        } else {
          console.log("from else", this.$refs);
        }
        return h;
      } else {
        return 200;
      }
    },
    heightForFriends() {
      if (this.heightAvailable) {
        var a = this.$refs;
        var h = 100;
        if (a.frnds_container) {
          h = a.frnds_container.clientHeight;
        } else {
          console.log("from else", this.$refs);
        }
        return h;
      } else {
        return 500;
      }
    },
  },
  methods: {
    sendMessage() {
      if (this.message) {
        console.log("here");
        this.$store
          .dispatch("sendMessage", {
            message: this.message,
            loadedContact: this.loadedContact,
          })
          .then(() => {
           this.message = null;
          })
          .catch((err) => {
            alert("error while sending message" + err);
          });
      }
    },
    setLoaded(i) {
      console.log("setloaded called");
      if (!i.blocked_by_me && !i.blocked_by_friend) {
        // this.loadedMessages = [];
        // this.loadedContact = null;
        this.loadedContact = i;
        this.$fb
          .firestore()
          .collection("users")
          .doc(this.getUser.uid)
          .collection("friends")
          .doc(i.uid)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            var arr = [];
            snapshot.forEach((snap) => {
              arr.push(snap.data());
            });
            this.loadedMessages = arr;
          });
      } else {
        this.$bvToast.toast(
          ` ${
            i.blocked_by_me
              ? " This Friends is blocked by you "
              : " Your Friends blocked  "
          } `,
          {
            title: `${
              i.blocked_by_me
                ? " you have blocked this friend ! you can unblock on your dashboard "
                : " Your Friends blocked you ! Can't laod Chat  "
            } ! `,
            autoHideDelay: 10000,
            variant: "warning",
            appendToast: true,
          }
        );
      }
    },
  },
  updated() {
    if (this.$refs.msg_container && !this.heightAvailable) {
      this.heightAvailable = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.msg_container) {
        this.heightAvailable = true;
      }
      this.$store.dispatch("subscribeToFriendsList");
    });
  },
};
</script>

<style scoped>
.search_input {
  filter: drop-shadow(0px 0px 25px rgba(0, 0, 0, 0.15));
}

.chat_wrapper {
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(75, 81, 91, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}
.write_message {
  background: #dee5ef;
  opacity: 0.4;
  border-radius: 24px;
  outline: none;
  border: none;
  height: 144px;
  color: black;
  width: 90%;
}
.send_btn {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 14px;
  margin-right: 19px;
}
.message_container {
  min-height: 61px;
  max-width: 70%;
  display: inline-block;
}

.message_box {
  position: relative;
  overflow: hidden;
}
.message_box_right {
  color: white;
}

.message_box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-size: cover;
}

.message_box_left::before {
  background: url("../../assets/message.svg") no-repeat center center;
}
.message_box_right::before {
  background: url("../../assets/message_sent.svg") no-repeat center center;
  transform: rotateY(0.5turn);
}
.blocked_friend {
  background: grey;
  cursor: not-allowed !important;
}
</style>