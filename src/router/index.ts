import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Kasse from "../views/Kasse.vue";
import Products from "../views/Products.vue";
import ProductNew from "../views/ProductNew.vue";
import ProductEdit from "../views/ProductEdit.vue";

import Bundles from "../views/Bundles.vue";
import BundleNew from "../views/BundleNew.vue";
import BundleEdit from "../views/BundleEdit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "kasse",
    component: Kasse,
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
    props: (route) => ({ newId: route.query.id }),
  },
  {
    path: "/products/edit",
    name: "products-edit",
    component: ProductEdit,
    props: (route) => ({ editId: route.query.id }),
  },
  {
    path: "/bundles",
    name: "bundles",
    component: Bundles,
  },
  {
    path: "/bundles/new",
    name: "bundles-new",
    component: BundleNew,
    props: (route) => ({ newId: route.query.id }),
  },
  {
    path: "/bundles/edit",
    name: "bundles-edit",
    component: BundleEdit,
    props: (route) => ({ editId: route.query.id }),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
