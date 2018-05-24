import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(Router)

export const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/home_index',
      name: 'home_index',
      component: () =>import('@/components/home_index'),
      children:[
        {
          path: 'msg',
          name: 'home_index_1',
          component: () =>import('@/components/HelloWorld')
        },
        {
          path: 'ATask',
          name: 'home_index_2',
          component: () =>import('@/components/ATask')
        },
        {
          path: 'upload',
          name: 'upload',
          component: () =>import('@/components/uploadComponents/Upload')
        }
      ]
    },
    { path: '/login', name:'login',component: () =>import('@/login') },
    { path: '/*', name:'*',component: () =>import('@/login') }
  ]
});
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
  });
router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
