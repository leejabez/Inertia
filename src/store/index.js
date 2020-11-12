import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
 
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: null,
        loadedProfile: null,
        friendsList: []
    },
    mutations: {
        setUser: (s, p) => {
            s.user = p
        },
        setLoadedProfile: (s, p) => {
            s.loadedProfile = p
        },
        setFriendsList: (s, p) => {
            s.friendsList = p
        }
    },
    getters: {
        getUser: (s) => {
            return s.user
        },
        getLoadedProfile: (s) => {
            return s.loadedProfile
        },
        getFriendsList: (s) => {
            return s.friendsList
        }
    },
    actions: {
        subscribeToFriendsList(s) {
            if (!s.state.friendsList.length) {
                var uid = s.getters.getUser ? s.getters.getUser.uid : null
                if (uid) {
                    console.log('subscribing to the frndx list')
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(uid)
                        .collection("friends")
                        .onSnapshot((snapshot) => {
                            var arr = [];
                            snapshot.forEach((snap) => {
                                arr.push(snap.data());
                            });
                            s.commit('setFriendsList', arr)
                        });
                } else {
                    // handle error with no uid
                }
            } else {
                // handle friends that already added
            }
        },
        sendMessage(s, p) {

            return new Promise((resolve, reject) => {
                var m = p.message;
                var uid = s.getters.getUser.uid
                var timestamp = firebase.firestore.Timestamp.fromDate(new Date());
                var batch = firebase.firestore().batch();
                var key = firebase
                    .firestore()
                    .collection("users")
                    .doc(uid)
                    .collection("friends")
                    .doc(p.loadedContact.uid)
                    .collection("messages")
                    .doc().id;

                var sentCopyForUser = firebase
                    .firestore()
                    .collection("users")
                    .doc(uid)
                    .collection("friends")
                    .doc(p.loadedContact.uid)
                    .collection("messages")
                    .doc(key);

                var sentCopyForSender = firebase
                    .firestore()
                    .collection("users")
                    .doc(p.loadedContact.uid)
                    .collection("friends")
                    .doc(uid)
                    .collection("messages")
                    .doc(key);

                var updateRootCopyForSender = firebase
                    .firestore()
                    .collection("users")
                    .doc(p.loadedContact.uid)
                    .collection("friends")  
                    .doc(uid);

                batch.set(sentCopyForUser, {
                    message: m,
                    timestamp,
                    sent: true,
                });

                batch.set(sentCopyForSender, {
                    message: m,
                    received: true,
                    timestamp,
                });

                batch.update(updateRootCopyForSender, {
                    last_message: m,
                    last_message_at: timestamp,
                });
                batch
                    .commit()
                    .then(() => {
                        resolve()
                    })
                    .catch((err) => {
                        alert("message sending failed " + err);
                        reject(err)
                    });
            })
        },
    }
})

export default store