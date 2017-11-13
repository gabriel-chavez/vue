import Vue from 'vue'
//import Router from 'vue-router'
import Task from './components/Ap.vue'
import App from './App.vue'
/*
Vue.use(Router)

var router=new Router({
  routes:[
    {
      path:'/task',
      component:Task,
    }
  ]
})
*/
var vm=new Vue({
  el: '#app',
  render: h => h(App)
})
