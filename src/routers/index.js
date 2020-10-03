import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from '@/routers/movie'
import cinemaRouter from '@/routers/cinema'
import mineRouter from '@/routers/mine'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  cinemaRouter,
  mineRouter,
  {
    path: '/*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
