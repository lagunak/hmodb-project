// Import Vue
import Vue from 'vue'

/*
//vue router manual - since f7 router is not appearing in vue dev tools.
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//--vue router manual
*/

//import Vuex (20190725)
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: true, //remove for production
  state: {
    //object containing all of our data members
    count: 0,
    info: { events: [] } //default value with events key
  },
  mutations: {
    increment(state, payload) {
      state.count = state.count + payload.amount
    },
    increment2(state, payload) {
      state.count = payload //state.count2 + payload.amount
    },
    updateInfo(state, payload) {
      state.info = payload
    }
  },
  actions: {
    downloadInfo({ commit }, payload) {
      fetch(
        'http://thecatholicdb.com/api/select.php?json={"apiKey":"invited034","sql":"select json from temples where temple_id=' +
          payload.id +
          '"}'
      )
        .then(response => response.json())
        .then(data => {
          commit('updateInfo', JSON.parse(decodeURIComponent(data[0].json)))
        })
    }
  }
})

/*
store.commit('increment')
console.log(store.state.count)
*/
// End Vuex stuff --------------------------- https://scrimba.com/p/pnyzgAP/cWw3Zhb

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css'

// Import Icons and App Custom Styles
import '../css/icons.css'
import '../css/app.css'

// Import App Component
import App from '../components/app.vue'

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue)

import { mapState, mapMutations } from 'vuex'

// Init App
new Vue({
  el: '#app',
  store, //add the Vuex Storage!  | by adding this  you can access to it from child components using this.$store.___
  computed: mapState(['count', 'info']), //this should allow other components to access the store like a local copmuted property --- TBC
  methods: mapMutations(['increment']),
  render: h => h(App),

  // Register App Component
  components: {
    app: App
  }
})
