import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../components/Auth.vue';

Vue.use(VueRouter)

const routes =[
    {
        path: '/',
        name: 'Auth',
        component: Auth
      },
]


const router = new VueRouter({
    routes,
    mode: 'history'
  })
  
  export default router