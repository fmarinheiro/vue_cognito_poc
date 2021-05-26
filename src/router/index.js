
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Register from "../views/Register";
import Login from "../views/Login";
import Posts from "../views/Posts";
import { getCurrentUser } from '../lib/AuthHelpers'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const cognitoUser = getCurrentUser();
        if (cognitoUser == null) {
            store.dispatch("LogOut");
            next("/login");
            return
        }

        cognitoUser.getSession((error, session) => {
            if (error) throw error;
            store.commit('setUser', session)
            next()
        })
    } else {
        next()
    }
});


/*
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const accessToken = new CognitoAccessToken({AccessToken: store.getters.AccessToken});
        const idToken = new CognitoIdToken({IdToken: store.getters.IdToken});
        const refreshToken = new CognitoRefreshToken({RefreshToken: store.getters.RefreshToken});

        const sessionData = {
          IdToken: idToken,
          AccessToken: accessToken,
          RefreshToken: refreshToken
        };

        const cachedSession = new CognitoUserSession(sessionData);

        if (cachedSession.isValid()) {
          next();
        } else {
          const cognitoUser = getCurrentUser();
          if (cognitoUser == null) {
            next("/login");
            return
          }

          cognitoUser.refreshSession(refreshToken, (err, session) => {
            if (err) throw err;
            store.commit('setUser', session)
            next()
          });
        }
    } else {
        next()
    }
});*/



export default router;