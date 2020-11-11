import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import firebase from 'firebase'
var config = {
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

new Vue({
  render: h => h(App),
}).$mount('#app')
