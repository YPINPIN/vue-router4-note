import {
  NavigationFailureType,
  createRouter,
  createWebHistory,
  isNavigationFailure,
} from 'vue-router';
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
  // 路由 active 狀態範例
  {
    path: '/students/:name',
    name: 'Students',
    component: () => import('@/views/Students.vue'),
    children: [
      {
        path: 'works/:workId',
        name: 'StudentWork',
        component: () => import('@/views/StudentWork.vue'),
      },
    ],
  },
  // Login 頁面
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  // Camera 頁面
  {
    path: '/camera',
    name: 'Camera',
    component: () => import('@/views/Camera.vue'),
    meta: { requiresCamera: true },
  },
  // Test 頁面
  {
    path: '/test/:testId',
    name: 'Test',
    component: () => import('@/views/Test.vue'),
    // beforeEnter: (to, from) => {
    //   console.log('beforeEnter-- /test/:testId ');
    //   // 可以根據條件決定是否取消導航
    //   // return false;
    // },
    // 設置函數陣列
    beforeEnter: [removeQuery, removeHash],
  },
  // 路由元信息
  {
    path: '/comments',
    component: () => import('@/views/CommentsLayout.vue'),
    children: [
      {
        path: 'new',
        name: 'CommentNew',
        component: () => import('@/views/CommentNew.vue'),
        // 只有經過身分驗證的使用者可以留言
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        name: 'CommentDetail',
        component: () => import('@/views/CommentDetail.vue'),
        // 任何人都可以查看留言
        meta: { requiresAuth: false },
      },
    ],
  },
  // 數據獲取 - ShowPost 頁面
  {
    path: '/showpost/:postId',
    name: 'ShowPost',
    component: () => import('@/views/ShowPost.vue'),
  },
  // 數據獲取 - ShowPost2 頁面
  {
    path: '/showpost2/:postId',
    name: 'ShowPost2',
    component: () => import('@/views/ShowPost2.vue'),
  },
  // router-view 插槽
  {
    path: '/slot',
    component: () => import('@/views/SlotLayout.vue'),
    children: [
      {
        path: 'one',
        name: 'SlotComp1',
        component: () => import('@/views/SlotComp1.vue'),
      },
      {
        path: 'two',
        name: 'SlotComp2',
        component: () => import('@/views/SlotComp2.vue'),
      },
    ],
  },
  // 單一路由指定 transition
  {
    path: '/transition',
    component: () => import('@/views/PanelLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/transition/left',
      },
      {
        path: 'left',
        component: () => import('@/views/PanelLeft.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: 'right',
        component: () => import('@/views/PanelRight.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'other',
        component: () => import('@/views/PanelOther.vue'),
      },
    ],
  },
  // 基於路由的動態過渡
  {
    path: '/transition-step',
    component: () => import('@/views/StepLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/transition-step/step1',
      },
      {
        path: 'step1',
        component: () => import('@/views/Step1.vue'),
      },
      {
        path: 'step1/1',
        component: () => import('@/views/Step1_1.vue'),
      },
      {
        path: 'step1/2',
        component: () => import('@/views/Step1_2.vue'),
      },
    ],
  },
  // 強制在複用的路由組件之間進行過渡
  {
    path: '/transition-demo',
    component: () => import('@/views/DemoLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/transition-demo/1',
      },
      {
        path: ':id',
        component: () => import('@/views/Demo.vue'),
      },
    ],
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
  // 指定 active class
  // linkActiveClass: 'link-active-green',
  // linkExactActiveClass: 'link-exact-active-green',
});

// 全局前置守衛
router.beforeEach((to, from) => {
  console.log('to:', to);
  console.log('from:', from);
  // 取消當前的導航
  // return false;
  // 一個路由地址(字串或物件)
  if (!isAuthenticated() && to.name !== 'Login') {
    // 重新導向到登入頁
    return { name: 'Login' };
  } else {
    // 不返回或返回 undefined、true
    // return undefined;
    // return true;
  }

  // 檢查路由是否需要授權
  if (to.meta.requiresAuth && !hasAuth()) {
    window.alert('You need to set Auth.');
    // 取消導航
    return false;
  }
});

// 檢查使用者是否已經登入
function isAuthenticated() {
  const isLogin = localStorage.getItem('isLogin');
  return isLogin;
}

// 檢查使用者是否取得權限
function hasAuth() {
  const hasAuth = localStorage.getItem('hasAuth');
  return hasAuth;
}

// 全局解析守衛
router.beforeResolve(async (to) => {
  console.log('router beforeResolve--');
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission();
    } catch (error) {
      console.log(error);
      if (error === 'NotAllowedError') {
        // 處理錯誤並取消導航
        return false;
      } else {
        // 意料之外的錯誤，取消導航並把錯誤傳給全局處理器
        throw error;
      }
    }
  }
});

// 模擬獲取權限
function askForCameraPermission() {
  console.log('askForCameraPermission...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject('NotAllowedError');
      }
    }, 2000);
  });
}

// 全局後置鉤子
router.afterEach((to, from, failure) => {
  console.log('router afterEach--');
  if (failure) {
    // 重複路由不顯示錯誤
    if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      sendToAnalytics(to, from, failure);
    }
  }

  // 基於路由設置動態過渡效果
  let toPath = to.path.split('/');
  if (toPath[1] && toPath[1] === 'transition-step') {
    const toDepth = toPath.length;
    const fromDepth = from.path.split('/').length;
    to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }
});

function sendToAnalytics(to, from, failure) {
  console.log('sendToAnalytics---', failure);
}

// 共用函數
function removeQuery(to) {
  if (Object.keys(to.query).length) {
    console.log('removeQuery');
    return { path: to.path, query: {}, hash: to.hash };
  }
}
function removeHash(to) {
  if (to.hash) {
    console.log('removeHash');
    return { path: to.path, query: to.query, hash: '' };
  }
}

// 共享路由實例
export default router;
