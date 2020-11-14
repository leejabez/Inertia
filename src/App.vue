<template>
  <div id="app" style="display: flex; flex-direction: column; height: 100vh">
    <header-view />
    <router-view style="flex: 1"></router-view>
    <div class="chat_popup_wrapper" v-if="shouldShowChatPopup">
      <transition name="fade">
        <div class="chat_popup" v-if="showChatPopup">
          <div class="px-2" v-if="!loadedContact">
            <template v-for="(v, k) in getFriendsList">
              <div
                @click="setLoaded(v)"
                :key="k"
                style="cursor: pointer"
                class="chat_wrapper my-3 d-flex flex-column justify-content-around"
              >
                <div
                  style="display: flex; align-items: center"
                  class="mt-3 mx-3 mb-2"
                >
                  <b-avatar
                    :src="v.userData.profile_pic_url || defaultProfilePic"
                    
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
          <div v-else>
            <div class="h-100" style="display: flex; flex-direction: column">
              <!-- header -->
              <div>
                <div
                  style="display: flex; align-items: center; cursor: pointer"
                  class="pb-1 border-bottom"
                  @click="loadedContact = null"
                >
                  <i
                    class="mdi mdi-chevron-left"
                    style="line-height: 35px; font-size: 35px"
                  ></i>
                  <b-avatar
                    class="bg-secondary"
                    :src="loadedContact.userData.profile_pic_url || defaultProfilePic"
                  ></b-avatar>
                  <div class=" " style="flex: 1; display: flex">
                    <div
                      class="text-left pl-2"
                      style="flex: 1; display: flex; flex-direction: column"
                    >
                      <span class="font-weight-bold">{{
                        loadedContact.userData.name
                      }}</span>
                  
                    </div>
                  </div>
                </div>
              </div>
              <!-- header end -->
              <!-- messages -->
              <div
                style="flex: 1; display: flex; flex-direction: column"
                ref="msg_container"
              >
                <!-- content -->
                <div
                  :style="{
                    height: '250px',
                    overflow: 'auto',
                  }"
                  class="text-left my-2"
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
                <div class="text-right" style="position: relative">
                  <div class="write_message d-flex flex-column">
                    <textarea
                      type="text"
                      class="p-4"
                      placeholder="Type Message Here"
                      v-model="message"
                    />
                    <b-button
                      variant="primary"
                      @click="sendMessage"
                      class="rounded-circle send_btn"
                      size="sm"
                    >
                      <i class="mdi mdi-send"></i>
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="chat_popup_btn" @click="activatePopup">
        <i class="mdi mdi-chat-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
import headerView from "@/components/header";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      showChatPopup: false,
      loadedContact: null,
      message: null,
      loadedMessages: [],
    };
  },
  methods: {
    activatePopup() {
      this.showChatPopup = !this.showChatPopup;
      this.$store.dispatch("subscribeToFriendsList");
    },
    setLoaded(i) {
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
    },
  computed: {
    ...mapGetters(["getFriendsList"]),
    shouldShowChatPopup() {
      return this.getUser != null && this.$route.fullPath != "/dashboard/chat";
    },
  },
  
  components: {
    headerView,
  },
}
}

</script>

<style lang="scss" scoped >
@import url("https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.8.55/css/materialdesignicons.min.css");
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@700&display=swap");
@import url("./assets/scss/custom.scss");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg-fer {
  background-color: #0094b6 ;
}
.text-fer {
  color: #0094b6 ;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
.chat_popup_wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 3vh;
  margin-right: 3vw;
  .chat_popup {
    max-width: 370px;
    min-width: 320px;
    max-height: 500px;
    min-height: 400px;
    border-radius: 32px;
    border: 1px solid black;
    padding: 15px;
    margin-bottom: 10px;
    background: #f3f3fb;
  }
  .chat_popup_btn {
    width: 49px;
    background: #0596b7;
    float: right;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 63px;
    color: white;
    cursor: pointer;
  }

  .chat_wrapper {
    background: #ffffff;
    box-shadow: 0px 3px 6px rgba(75, 81, 91, 0.15),
      0px 1px 3px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    cursor: pointer;
  }
  .write_message {
    background: #dee5ef;
    border-radius: 24px;
    outline: none;
    border: none;
    height: 100px;
    color: black;
    width: 100%;
  }
  .send_btn {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 0px;
    margin-right: 2px;
  }
  .write_message textarea {
    border-radius: 24px;

    opacity: 0.4;
    height: 74%;
    background: #dee5ef;
    border: none;
    outline: none;
    resize: none;
  }
  .message_container {
    min-height: 61px;
    max-width: 90%;

    display: inline-block;
  }
  .message_box {
    position: relative;
    overflow: hidden;
  }

  .message_box_left {
    color: black;
    background: white;
    border-radius: 69px;
  }
  .message_box_right {
    color: white;
    background: #0596b7;
    border-radius: 69px;
  }

}
</style>
