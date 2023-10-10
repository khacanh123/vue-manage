import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import admin from "@/layout/admin.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: {
        layout: admin,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DetailView.vue"),
    },
    // {
    //   path: "/question/create",
    //   name: "createQuestion",
    //   meta: {
    //     layout: admin,
    //   },
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/createQuestion.vue"),
    // },
    {
      path: "/test-demo",
      name: "testdemo",
      // meta: {}
      component: () => import("../views/Test.vue"),
    },
    {
      path: "/active-sprint",
      name: "activeSprint",
      meta: {
        layout: admin,
      },
      component: () => import("../views/TaskActive.vue"),
    },
    {
      path: "/add-user",
      name: "add-user",
      meta: {
        layout: admin,
      },
      component: () => import("../views/AddUser.vue"),
    },
    {
      path: "/add-course",
      name: "add-course",
      meta: {
        layout: admin,
      },
      component: () => import("../views/AddCourse.vue"),
    },
    {
      path: "/list-class",
      name: "listclass",
      meta: {
        layout: admin,
      },
      component: () => import("../views/ListClass.vue"),
    },
    {
      path: "/add-project",
      name: "addproject",
      meta: {
        layout: admin,
      },
      component: () => import("../views/Projects/AddProject.vue"),
    },
    {
      path: "/list-project",
      name: "listproject",
      meta: {
        layout: admin,
      },
      component: () => import("../views/Projects/ListProject.vue"),
    },
    {
      path: "/blacklog/:key",
      name: "blacklogproject",
      meta: {
        layout: admin,
      },
      component: () => import("../views/Projects/Backlog.vue"),
    },
    {
      path: "/project/:key/active-sprint",
      name: "activesprint",
      meta: {
        layout: admin,
      },
      component: () => import("../views/Projects/ActiveSprint.vue"),
    },
  ],
});

export default router;
