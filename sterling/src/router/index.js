import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login/Login'
import Callback from '@/components/Login/Callback'
import Dashboard from '@/components/Dashboard/Dashboard'
import PartsAnalysis from '@/components/Parts/Analysis'
import PartsAnalysisList from '@/components/Parts/AnalysisList'
import PartsAnalysisSummary from '@/components/Parts/AnalysisSummary'
import SpareDetails from '@/components/Parts/SpareDetails'
import DynamicTable from '@/components/Parts/Table'
import Reference from '@/components/Reference/Reference'
import ErrorSummary from '@/components/Parts/ErrorSummary'
import CreateAnalysis from '@/components/Parts/CreateAnalysis'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/callback',
      name: 'callback',
      component: Callback
    }, {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }, {
      path: '/parts/analysis/create',
      name: 'CreateAnalysis',
      component: CreateAnalysis
    },{
      path: '/parts/analysis/view',
      name: 'PartsAnalysis',
      component: PartsAnalysis
    },{
      path: '/parts/analysis/dashboard',
      name: 'PartsAnalysisList',
      component: PartsAnalysisList
    }, {
      path: '/parts/analysis/summary',
      name: 'PartsAnalysisSummary',
      component: PartsAnalysisSummary
    },
    {
      path: '/parts/analysis',
      name: 'SpareDetails',
      component: SpareDetails
    },
    {
      path: '/table',
      name: 'DynamicTable',
      component: DynamicTable
    },
    {
      path: '/reference',
      name: 'Reference',
      component: Reference
    },
    {
      path: '/parts/analysis/error',
      name: 'ErrorSummary',
      component: ErrorSummary
    }
  ]
})
