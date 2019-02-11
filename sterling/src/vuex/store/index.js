import Vue from 'vue';
import Vuex from 'vuex';
import { partsAnalysis } from './partsAnalysis.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        partsAnalysis
    }
})
