import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
import HomeComponent from "@/views/HomeComponent.vue";
import WorldTracking from "../../public/WorldTracking.vue";
import BusinessCard from "../views/BusinessCard.vue";
import AllInOne from "@/views/AllInOne.vue";
import ContactPage from "@/views/ContactPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: AllInOne,
  },
  {
    path: "/video",
    name: "video",
    component: BusinessCard,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactPage,
  },
  {
    path: "/3d",
    name: "3dComponent",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ArWith3D.vue"),
  },
  {
    path: "/orbit",
    name: "orbit",
    component: () => import("../views/OrbitControl.vue"),
  },
  {
    path: "/subject/:id",
    name: "subjects",
    component: () => import("../views/subject/Model.vue"),
  },
  {
    path: "/model/:id",
    name: "modelById",
    component: () => import("../views/product/ProductItem.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
