import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import WorldTracking from "../../public/WorldTracking.vue";
import BusinessCard from "../views/BusinessCard.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: WorldTracking,
  },
  {
    path: "/video",
    name: "video",
    component: BusinessCard,
  },
  {
    path: '/3d',
    name: '3dComponent',

    component: () => import(/* webpackChunkName: "about" */ '../views/ArWith3D.vue')
  },
  {
    path: '/orbit',
    name: 'orbit',
    component: () => import('../views/OrbitControl.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
