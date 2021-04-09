import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决vue-router在3.0版本以上重复点菜单报错问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
//如果以上代码失效，可以把两种都写上，就可以解决了
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

//导入相关视图
const Home = () => import('views/home/Home.vue');
const Details = () => import('views/details/Details.vue')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')

const routes = [
  {
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/datails/:iid',
    component: Details,
    name: '/details'
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/category',
    component: Category
  }
]

const router = new VueRouter({
  routes
})

export default router
