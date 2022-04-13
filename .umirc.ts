import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  // layout: {},
  routes: [
    {
      path: "/",
      component: "@/layouts/index",
      routes: [
        { path: "/common", component: "@/pages/CommonForm" },
        { path: "/pro", component: "@/pages/ProFormComp" },
        { path: "/workflow", component: "@/pages/WorkflowCard" },
        { path: "/inter", component: "@/pages/InternationalizedComp" },
        { path: "/*", redirect: "/common" },
      ],
    },
  ],
  fastRefresh: {},
});
