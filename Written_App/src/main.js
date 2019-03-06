import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'

Vue.use(Vuetify)
firebase.initializeApp({
  apiKey: 'AIzaSyC_Dch5-fuzWLgtuPSNrBS3dUeKOUrbbUo',
  authDomain: 'chat-ce3ae.firebaseapp.com',
  databaseURL: 'https://chat-ce3ae.firebaseio.com',
  projectId: 'chat-ce3ae',
  storageBucket: 'chat-ce3ae.appspot.com',
  messagingSenderId: '78447938521'
})

Vue.config.productionTip = false
window.firebase = firebase

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
