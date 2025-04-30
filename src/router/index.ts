import { createRouter, createWebHistory } from "vue-router";

const routes: Array<any> = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "Article",
        name: "Article",
        redirect: "/Article/list",
        component: () => import("../views/article/index.vue"),
        children: [
          {
            path: "list",
            name: "Article-list",
            component: () => import("../views/article/detail.vue"),
          },
          {
            path: "add",
            name: "Article-create",
            component: () => import("../views/article/add.vue"),
          },
          {
            path: ":id",
            name: "Article-detail",
            component: () => import("../views/article/detail.vue"),
          },
        ],
      },
      {
        path: "Moments",
        name: "Moments",
        component: () => import("../views/Moments/index.vue"),
        redirect: "/Moments",
        children: [
          {
            path: "add",
            name: "Moments-add",
            component: () => import("../views/Moments/add.vue"),
          },
          {
            path: "",
            name: "Moments",
            component: () => import("../views/Moments/list.vue"),
          },
        ]
      },
      {
        path: "TreeHole",
        name: "TreeHole",
        component: () => import("../views/TreeHole/index.vue")
      },
      {
        path: "About",
        name: "About",
        component: () => import("../views/About/index.vue")
      },
      {
        path: "Links",
        name: "Links",
        component: () => import("../views/Links/index.vue"),
        redirect: "/Links",
        children: [
          {
            path: "add",
            name: "add-links",
            component: () => import("../views/Links/add.vue"),
          },
          {
            path: "",
            name: "sq-links",
            component: () => import("../views/Links/view.vue"),
          }
        ]
      },
      {
        path: "Message",
        name: "Message",
        component: () => import("../views/Message/index.vue")
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
