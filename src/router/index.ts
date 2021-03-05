import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Kasse from "../views/Kasse.vue";
import Products from "../views/Products.vue";
import ProductNew from "../views/ProductNew.vue";
import ProductEdit from "../views/ProductEdit.vue";

import Menucards from "../views/Menucards.vue";
import Menucard from "../views/Menucard.vue";
import MenucardNew from "../views/MenucardNew.vue";
import MenucardEdit from "../views/MenucardEdit.vue";

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
    path: "/menucards",
    name: "menucards",
    component: Menucards,
  },
  {
    path: "/menucard",
    name: "menucard",
    component: Menucard,
    props: (route) => ({ id: route.query.id }),
  },
  {
    path: "/menucards/new",
    name: "menucards-new",
    component: MenucardNew,
    props: (route) => ({ newId: route.query.id }),
  },
  {
    path: "/menucards/edit",
    name: "menucards-edit",
    component: MenucardEdit,
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
