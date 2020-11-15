import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './mixin'
Vue.config.productionTip = false
import router from './router'
import store from './store'


import VueChatScroll from 'vue-chat-scroll'
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
    componentPrefix: 'vc'
});

Vue.use(VueChatScroll)
import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyA_wkBkHC4id3jhgacsaLtJr0No3R3CqkI",
    authDomain: "socialapp-f36f4.firebaseapp.com",
    databaseURL: "https://socialapp-f36f4.firebaseio.com",
    projectId: "socialapp-f36f4",
    storageBucket: "socialapp-f36f4.appspot.com",
    messagingSenderId: "677020236144",
    appId: "1:677020236144:web:7020653dd7e6a8b0f9b7b5"
}
firebase.initializeApp(config)
Vue.prototype.$fb = firebase


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('user logged in', user)
        firebase.firestore().collection('users').doc(user.uid).onSnapshot((snap) => {
            store.commit('setUser', snap.data())
        })
        router.replace('/')
        mountNow()

    } else {
        console.log('not yet logged in')
        store.commit('setUser', null)
        router.replace('/')
        mountNow()
    }

    function mountNow() {
        new Vue({
            store,
            router,
            render: h => h(App),
        }).$mount('#app')
    }
})