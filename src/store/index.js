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
                // handle friends that are already added.
            }
        },
    }
})

export default store