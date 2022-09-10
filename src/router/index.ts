import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Kasse from "../views/Kasse.vue";
import Checkout from "../views/checkout/Checkout.vue";
import CheckoutSerial from "../views/checkout/Serial.vue";
import CheckoutCash from "../views/checkout/CheckoutCash.vue";
import CheckoutCard from "../views/checkout/CheckoutCard.vue";
import CheckoutApp from "../views/checkout/CheckoutApp.vue";

import Pay from "../views/Pay.vue";

import Products from "../views/products/Products.vue";
import ProductEdit from "../views/products/ProductEdit.vue";

import Tills from "../views/tills/Tills.vue";
import TillEdit from "../views/tills/TillEdit.vue";
import TillCatalog from "../views/tills/TillCatalog.vue";

import Orders from "../views/orders/Orders.vue";

import Settings from "../views/Settings.vue";

import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";

import Workspaces from "@/views/workspaces/Workspaces.vue";
import WorkspaceEdit from "@/views/workspaces/WorkspaceEdit.vue";
import Workspace from "@/views/workspaces/Workspace.vue";
import WorkspaceInvite from "@/views/workspaces/WorkspaceInvite.vue";
import WorkspaceInviteEdit from "@/views/workspaces/WorkspaceInviteEdit.vue";

import Receipts from "@/views/receipts/Receipts.vue";

import Scan from "@/views/Scan.vue";

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
    path: "/checkout/serial",
    name: "checkout-serial",
    component: CheckoutSerial,
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
    path: "/orders",
    name: "orders",
    component: Orders,
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
    props: (route) => ({ id: route.query.id }),
  },
  {
    path: "/products/edit",
    name: "products-edit",
    component: ProductEdit,
    props: (route) => ({ id: route.query.id }),
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
    props: (route) => ({ id: route.query.id }),
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
    props: (route) => ({ id: route.query.id }),
  },
  {
    path: "/workspaces/:id",
    name: "workspace",
    component: Workspace,
  },
  {
    path: "/workspaces/:wid/invite/new",
    name: "workspaces-invite-new",
    component: WorkspaceInviteEdit,
  },
  {
    path: "/workspaces/:wid/invite/:id",
    name: "workspaces-invite",
    component: WorkspaceInviteEdit,
  },
  {
    path: "/workspaces/:wid/invite/:id/claim",
    name: "workspaces-invite-claim",
    component: WorkspaceInvite,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/scan",
    name: "scan",
    component: Scan,
  },
  {
    path: "/receipts",
    name: "receipts",
    component: Receipts,
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
