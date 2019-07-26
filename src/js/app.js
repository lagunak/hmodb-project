// Import Vue
import Vue from 'vue'

//import Vuex (20190725)
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

import { mapState, mapMutations } from 'vuex'

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

// Init App
new Vue({
  el: '#app',
  store, //add the Vuex Storage!  | trhen you can access to it from child components using return this.$store.___
  computed: mapState(['count']), //this should allow other components to access the store like a local copmuted property --- TBC
  methods: mapMutations([]),
  render: h => h(App),

  // Register App Component
  components: {
    app: App
  }
})
