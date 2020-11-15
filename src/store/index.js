import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: null,
        loadedProfile: null,
        friendsList: [],
        request: []
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
        },
        setRequests: (s, p) => {
            s.request = p
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
        },
        getRequests: (s) => {
            return s.request
        }
    },
    actions: {
        async subscribeToFriendsList(s) {
            if (!s.state.friendsList.length) {
                var uid = s.getters.getUser ? s.getters.getUser.uid : null
                if (uid) {
                    console.log('subscribing to the frndx list')
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(uid)
                        .collection("friends")
                        .onSnapshot(async (snapshot) => {
                            var arr = [];
                           
                                for (var snap of snapshot.docs) {
                                    var o = snap.data()
                                    console.log(o)
                                    console.log(o.userRef)
                                    var temp = await o.userRef.get()
                                    o.userData = temp.data()
                                    arr.push(o);
                                }
                            s.commit('setFriendsList', arr)
                        });
                } else {
                    //hanlde error no uid
                }
            } else {
                //handle already added friends in the list
            }
        },
        subscribeToRequests(s) {
            if (!s.getters.getRequests.length) {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(s.getters.getUser.uid)
                    .collection("friends")
                    .where("is_approved", "==", false)
                    .onSnapshot((friends) => {
                        var arr = [];
                        friends.forEach((f) => {
                            arr.push(f.data());
                        });
                        s.commit('setRequests', arr)
                    })
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

                // var updateRootCopyForUser = firebase
                //     .firestore()
                //     .collection("users")
                //     .doc(uid)
                //     .collection("friends")
                //     .doc(p.loadedContact.uid);

                var updateRootCopyForSender = firebase
                    .firestore()
                    .collection("users")
                    .doc(p.loadedContact.uid)
                    .collection("friends")
                    .doc(uid);

                var senderIncrement = firebase
                    .firestore()
                    .collection("users")
                    .doc(uid)


                var receiverIncrement = firebase
                    .firestore()
                    .collection("users")
                    .doc(p.loadedContact.uid)

                batch.update(senderIncrement, {
                    sent: firebase.firestore.FieldValue.increment(1)
                })

                batch.update(receiverIncrement, {
                    received: firebase.firestore.FieldValue.increment(1)
                })
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