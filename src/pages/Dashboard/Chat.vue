<template>
  <b-container fluid class="h-100">
    <b-row class="h-100">
      <b-col
        cols="12"
        md="4"
        lg="3"
        class="pt-4 h-100"
        style="background-color: #f2f5f9; display: flex; flex-direction: column"
      >
        <b-input placeholder="Search" class="rounded-pill search_input">
        </b-input>
        <div style="flex: 1" class=" ">
          <div
            class="px-2"
            :style="{ height: heightForFriends + 'px' , overflow: 'auto' }"
          >
          <template v-for="(v, k) in getFriendsList">
          <div
                @click="setLoaded(v)"
                :key="k"
                style="cursor: pointer"
                :class="['chat_wrapper my-3 d-flex flex-column justify-content-around',
                  { blocked_friend: v.blocked_by_me || blocked_by_friend },
                ]"
                >
          <div
            style="display: flex; align-items: center; background-color: white, border-radius:10px;"
            class="mt-3 mx-3 mb-2"
            >
                  <b-avatar
                    :src="v.profile_pic_url || defaultProfilePic"
      
                    class="bg-secondary"
                  ></b-avatar>
                  <div class=" " style="flex: 1; display: flex">
                    <div
                      class="text-left pl-2"
                      style="flex: 1; display: flex; flex-direction: column"
                    >
                      <span class="font-weight-bold">{{ v.userData.name }}</span>
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
        <b-col cols="12" md="8" lg="9" class="h-100">>
          <div
          v-if="loadedContact"
          class="p-4 h-100"
          style="display: flex; flex-direction: column"
          >
          <!-- messages header-->
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
                </div>
              </div>
            </div>
          </div>
          <!-- messages -->
          <div
            style="flex: 1; display: flex; flex-direction: column"
            class="px-3"
            ref="msg_container"
          >
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
          </div>
          <!-- send message button-->
          <div class="text-right" ref="msg_box" style="position: relative">
              <textarea
                type="text"
                class="write_message p-4"
                placeholder="Type Message Here"
                v-model="message"
                style = "box-shadow: 10px 10px 5px #ccc"
              />
              <b-button
                variant="info"
                class="rounded-circle send_btn"
                size="lg"
                @click="sendMessage"
              >
                <i class="mdi mdi-send h6"></i>
              </b-button>
            </div>
          </div>
          <div
            v-else
            class="p-4 h-100 justify-content-center"
            style="display: flex; flex-direction: column"
          >
        <h2 class="text-primary">
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
      message: null,
      loadedMessages: []
    }
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
        return 200;
      }
    },
  },
  methods: {
    setLoaded(i) {
    this.loadedMessages = []
    this.loadedContact = null
    if (!i.blocked_by_me && !i.blocked_by_friend) {
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
    sendMessage() {
      if (this.message) {
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
    }
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
}
</script>

<style>
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

</style>