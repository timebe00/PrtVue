import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TodoApp from "@/views/TodoApp.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TodoApp",
    component: TodoApp
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
