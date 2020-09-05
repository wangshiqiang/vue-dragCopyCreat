import Vue from 'vue'
import Router from 'vue-router'
import dragResizAble from '@/view/dragResizAble'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dragResizAble',
      component: dragResizAble
    },
    {
      path: '/dragResizAble',
      name: 'dragResizAble',
      component: dragResizAble
    }
  ]
})
