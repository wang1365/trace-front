import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/config/person',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/config',
    component: Layout,
    meta: {
      title: 'config',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'person',
        component: () => import('@/views/person/index'),
        name: 'Person',
        meta: { title: 'person', icon: 'people', noCache: true }
      },
      {
        path: 'company',
        component: () => import('@/views/company/index'),
        name: 'Company',
        meta: { title: 'company', icon: 'tab', noCache: true }
      },
      {
        path: 'qualification',
        component: () => import('@/views/qualification/index'),
        name: 'Qualification',
        meta: { title: 'qualification', icon: 'el-icon-tickets', noCache: true }
      }
    ]
  },
  {
    path: '/plant',
    component: Layout,
    meta: {
      title: 'plantInfo',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/goods/index'),
        name: 'Goods',
        meta: { title: 'goods', icon: 'example', noCache: true }
      },
      {
        path: 'base',
        component: () => import('@/views/plant/base'),
        name: 'PlantBase',
        meta: { title: 'plantBase', icon: 'table', noCache: true }
      },
      {
        path: 'detail/:plantId',
        component: () => import('@/views/plant/detail'),
        name: 'PlantDetail',
        meta: { title: 'plantDetail', icon: 'excel', noCache: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'orderManage', icon: 'el-icon-goods', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/index'),
        name: 'Order',
        meta: { title: 'order', icon: 'excel', noCache: true }
      },
      {
        path: 'detail/:orderId',
        component: () => import('@/views/order/OrderDetail'),
        name: 'OrderDetail',
        hidden: true
      }
    ]
  },
  {
    path: '/qrcode',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/qrcode/index'),
        name: 'Qrcode',
        meta: { title: 'qrcode', icon: 'el-icon-search', noCache: true }
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/image/index'),
        name: 'Image',
        meta: { title: 'image', icon: 'el-icon-picture-outline', noCache: true }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'monitor', icon: 'el-icon-view', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/monitor/index'),
        name: 'Image',
        meta: { title: 'monitorManage', icon: 'example', noCache: true }
      }
    ]
  },
  {
    path: '/waybill',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/waybill/index'),
        name: 'Waybill',
        meta: { title: 'waybill', icon: 'el-icon-news', noCache: true }
      }
    ]
  },
  {
    path: '/quality-report',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'quality', icon: 'el-icon-printer', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/quality-report/index'),
        name: 'QualityReport',
        meta: { title: 'qualityReport', icon: 'el-icon-menu', noCache: true }
      }
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ],
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]
