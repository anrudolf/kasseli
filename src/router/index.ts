import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Kasse from "../views/Kasse.vue";
import Checkout from "../views/checkout/Checkout.vue";
import CheckoutCash from "../views/checkout/CheckoutCash.vue";
import CheckoutCard from "../views/checkout/CheckoutCard.vue";
import CheckoutApp from "../views/checkout/CheckoutApp.vue";
import CheckoutSuccess from "../views/checkout/CheckoutSuccess.vue";

import Pay from "../views/Pay.vue";

import Products from "../views/products/Products.vue";
import ProductEdit from "../views/products/ProductEdit.vue";

import Tills from "../views/tills/Tills.vue";
import TillEdit from "../views/tills/TillEdit.vue";
import TillCatalog from "../views/tills/TillCatalog.vue";

import Settings from "../views/Settings.vue";

import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/SignIn.vue";

import Workspaces from "@/views/workspaces/Workspaces.vue";
import WorkspaceEdit from "@/views/workspaces/WorkspaceEdit.vue";

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
    path: "/tills/catalog",
    name: "tills-catalog",
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
    path: "/workspaces",
    name: "workspaces",
    component: Workspaces,
  },
  {
    path: "/workspaces/new",
    name: "workspaces-new",
    component: WorkspaceEdit,
  },
  {
    path: "/workspaces/edit",
    name: "workspaces-edit",
    component: WorkspaceEdit,
    props: (route) => ({ editId: route.query.id }),
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
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
