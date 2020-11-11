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
    }
})