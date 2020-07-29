import Vue from 'vue'
import Router from 'vue-router'
import main_page from '@/components/main_page'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main_page',
      component: main_page
    }
  ]
})
