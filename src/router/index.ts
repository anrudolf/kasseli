import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Kasse from "../views/Kasse.vue";
import Checkout from "../views/Checkout.vue";
import CheckoutCash from "../views/CheckoutCash.vue";
import CheckoutCard from "../views/CheckoutCard.vue";
import CheckoutApp from "../views/CheckoutApp.vue";
import CheckoutSuccess from "../views/CheckoutSuccess.vue";

import Pay from "../views/Pay.vue";

import Products from "../views/Products.vue";
import ProductEdit from "../views/ProductEdit.vue";

import Tills from "../views/Tills.vue";
import TillEdit from "../views/TillEdit.vue";
import TillCatalog from "../views/TillCatalog.vue";

import Settings from "../views/Settings.vue";

import Debug from "../views/Debug.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "kasse",
    component: Kasse,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/checkout/cash",
    name: "checkout-cash",
    component: CheckoutCash,
  },
  {
    path: "/checkout/card",
    name: "checkout-card",
    component: CheckoutCard,
  },
  {
    path: "/checkout/app",
    name: "checkout-app",
    component: CheckoutApp,
  },
  {
    path: "/checkout/success",
    name: "checkout-success",
    component: CheckoutSuccess,
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    props: (route) => ({ id: route.query.id }),
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
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/debug",
    name: "debug",
    component: Debug,
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
  // @ts-ignore: no time for this shit
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
