// import { search } from 'core-js/fn/symbol'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/router/Home'
import Search from '@/router/Search'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {path:'/home',
      component:Home
    },
    {path:'/search',
      component:Search
    },
  ]
})