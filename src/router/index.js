import { createRouter, createWebHistory } from 'vue-router';
// 靜態導入
import Home from '@/views/Home.vue';

// 配置路由規則
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 設置別名
    alias: '/home2',
  },
  // 設置重新導向
  {
    path: '/home',
    redirect: '/',
    // 也可以使用命名路由
    // redirect: { name: 'Home' },
  },
  // 指定一個方法動態返回重新導向的目標
  {
    // /search/screens 重新導向 /search?q=screens
    path: '/search/:searchText',
    // 方法會接收目標路由 to 作為參數
    redirect: (to) => {
      // 返回重新導向的路由地址或是一個描述地址的物件
      return { path: '/search', query: { q: to.params.searchText } };
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  // 相對位置重新導向 (不建議使用)
  {
    // /info 重新導向到 /about
    path: '/info',
    redirect: 'about',
  },
  {
    path: '/about',
    name: 'About',
    // 動態導入(懶加載)
    component: () => import('@/views/About.vue'),
  },
  // 巢狀路由
  {
    path: '/users/:userId',
    component: () => import('@/views/User.vue'),
    // 命名設置在子路由
    children: [
      {
        // 當 /user/:userId 時匹配成功
        path: '',
        name: 'User',
        component: () => import('@/views/UserHome.vue'),
      },
      {
        // 當 /user/:userId/profile 時匹配成功
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        // 當 /user/:userId/posts 時匹配成功
        path: 'posts',
        name: 'UserPosts',
        component: () => import('@/views/UserPosts.vue'),
      },
    ],
  },
  {
    path: '/users/:userId/posts/:postId',
    name: 'UserPost',
    component: () => import('@/views/UserPost.vue'),
  },
  // 設置共用的路徑前綴
  {
    path: '/admin',
    children: [
      {
        // 當 /admin 時匹配成功
        path: '',
        name: 'AdminOverview',
        component: () => import('@/views/AdminOverview.vue'),
      },
      {
        // 當 /admin/users 時匹配成功
        path: 'users',
        name: 'AdminUserList',
        component: () => import('@/views/AdminUserList.vue'),
      },
      {
        // 當 /admin/users/:id 時匹配成功
        path: 'users/:id',
        name: 'AdminUserDetails',
        component: () => import('@/views/AdminUserDetails.vue'),
      },
    ],
  },
  // 設置命名視圖
  {
    path: '/settings',
    name: 'Settings',
    components: {
      default: () => import('@/views/Settings.vue'),
      sidebar: () => import('@/views/SettingNav.vue'),
    },
    // 巢狀路由
    children: [
      {
        path: 'email',
        name: 'SettingEmail',
        // 顯示 default 視圖
        component: () => import('@/views/SettingEmail.vue'),
      },
      {
        path: 'profile',
        name: 'SettingProfile',
        // 多個視圖顯示
        components: {
          default: () => import('@/views/SettingProfile.vue'),
          helper: () => import('@/views/SettingHelper.vue'),
        },
      },
    ],
  },
  // 設置多個別名
  {
    // :id 必須為數字
    path: '/photo/:id(\\d+)',
    component: () => import('@/views/PhotoLayout.vue'),
    children: [
      {
        // 將匹配 3 個 url
        // /photo/1
        // /photo/1/detail
        // /photo-1
        path: '',
        name: 'PhotoDetail',
        component: () => import('@/views/PhotoDetail.vue'),
        alias: ['detail', '/photo-:id(\\d+)'],
      },
    ],
  },
  // 設置 props - 布林模式
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    props: true,
  },
  {
    path: '/products2/:id',
    name: 'ProductWithNav',
    components: {
      default: () => import('@/views/ProductDetail.vue'),
      sidebar: () => import('@/views/ProductNav.vue'),
    },
    // 多個視圖定義 props
    props: { default: true, sidebar: false },
  },
  // 設置 props - 物件模式
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductDetail.vue'),
    // 傳入靜態資料
    props: { id: '100' },
  },
  {
    path: '/products2',
    name: 'Products2',
    components: {
      default: () => import('@/views/ProductDetail.vue'),
      sidebar: () => import('@/views/ProductNav.vue'),
    },
    // 多個視圖定義 props
    props: { default: { id: '200' }, sidebar: false },
  },
  // 設置 props - 函數模式
  {
    // /find?t=vue&c=book
    // 將 { title: "vue", category: "book", isFind: true } 作為 props 傳遞給組件
    path: '/find',
    name: 'ProductFind',
    component: () => import('@/views/ProductFind.vue'),
    props: (route) => ({
      title: route.query.t,
      category: route.query.c,
      isFind: true,
    }),
  },
  // 設置 404 NotFound 頁面
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  // 匹配 /user-開頭的路由地址，後面的值傳入 afterUser
  {
    path: '/user-:afterUser(.*)',
    name: 'UserOther',
    component: () => import('@/views/UserOther.vue'),
  },
];

// 創建路由實例
const router = createRouter({
  // 指定模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 設定前面配置的路由
  routes,
});

// 共享路由實例
export default router;
