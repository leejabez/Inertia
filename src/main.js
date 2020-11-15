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
var firebaseConfig = {
    apiKey: "AIzaSyCbvzP9x_fPQQacQmZyJBYxhqXuP8gURyE",
    authDomain: "bt3103-wildcard-f3bde.firebaseapp.com",
    databaseURL: "https://bt3103-wildcard-f3bde.firebaseio.com",
    projectId: "bt3103-wildcard-f3bde",
    storageBucket: "bt3103-wildcard-f3bde.appspot.com",
    messagingSenderId: "483684076839",
    appId: "1:483684076839:web:0c6a68dc882b11228eed02",
    measurementId: "G-0D74VFMVGB"
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