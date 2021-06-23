import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Kasse from "../views/Kasse.vue";
import PayCash from "../views/PayCash.vue";

import Products from "../views/Products.vue";
import ProductEdit from "../views/ProductEdit.vue";

import Tills from "../views/Tills.vue";
import TillEdit from "../views/TillEdit.vue";
import TillCatalog from "../views/TillCatalog.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "kasse",
    component: Kasse,
  },
  {
    path: "/pay",
    name: "pay",
    component: PayCash,
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/products/new",
    name: "products-new",
    component: ProductEdit,
    props: (route) => ({ newId: route.query.id }),
  },
  {
    path: "/products/edit",
    name: "products-edit",
    component: ProductEdit,
    props: (route) => ({ editId: route.query.id }),
  },
  {
    path: "/till-catalog",
    name: "till-catalog",
    component: TillCatalog,
    props: (route) => ({ id: route.query.id }),
  },
  {
    path: "/tills",
    name: "tills",
    component: Tills,
  },
  {
    path: "/tills/new",
    name: "tills-new",
    component: TillEdit,
  },
  {
    path: "/tills/edit",
    name: "tills-edit",
    component: TillEdit,
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
