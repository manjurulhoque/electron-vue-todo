import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //     // =============================================================================
        //     // MAIN LAYOUT ROUTES
        //     // =============================================================================
        //     path: "",
        //     component: () => import("../layouts/main/Main.vue"),
        //     children: [
        //         // =============================================================================
        //         // Theme Routes
        //         // =============================================================================
        //         {
        //             path: "/",
        //             name: "home",
        //             component: () => import("../views/Home.vue")
        //         },
        //         {
        //             path: "/page2",
        //             name: "page-2",
        //             component: () => import("../views/Page2.vue")
        //         }
        //     ]
        // }
        {
            path: "/",
            name: "landing-page",
            component: require("@/components/LandingPage").default
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
});
