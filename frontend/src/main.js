// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VTooltip from 'v-tooltip'
import JsonExcel from "vue-json-excel";
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)
Vue.component("downloadExcel", JsonExcel);


Vue.use(VTooltip)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
