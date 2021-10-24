import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    component: () =>
      import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
  },
  {
    path: '/books',
    name: 'books',
    component: () =>
      import(/* webpackChunkName: "books" */ '../views/Books.vue'),
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: () =>
      import(/* webpackChunkName: "category" */ '../views/Category.vue'),
  },
  {
    path: '/book/:slug',
    name: 'book',
    component: () =>
      import(/* webpackChunkName: "category" */ '../views/Book.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () =>
      import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue'),
    meta: { auth: true },
  },
  {
    path: '/payment',
    name: 'payment',
    component: () =>
      import(/* webpackChunkName: "payment" */ '../views/Payment.vue'),
    meta: { auth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: { auth: true },
  },
  {
    path: '/my-order',
    name: 'my-order',
    component: () =>
      import(/* webpackChunkName: "my-order" */ '../views/MyOrder.vue'),
    meta: { auth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// tambahkan ini untuk melakukan pengecekan pada setiap routing
router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if (to.matched.some((record) => record.meta.auth)) {
    // jika user adalah guest
    if (store.getters['auth/guest']) {
      // tampilkan pesan bahwa harus login dulu
      store.dispatch('alert/set', {
        status: true,
        text: 'Login first',
        color: 'error',
      })

      // tampilkan form login
      store.dispatch('setPrevUrl', to.path) // tambahkan ini
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
