import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Kasse from "../views/Kasse.vue";
import Products from "../views/Products.vue";
import ProductNew from "../views/ProductNew.vue"
import ProductEdit from "../views/ProductEdit.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "kasse",
    component: Kasse
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/products/new",
    name: "products-new",
    component: ProductNew,
  },
  {
    path: "/products/edit",
    name: "products-edit",
    component: ProductEdit,
    props: route => ({ editId: route.query.id })
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
