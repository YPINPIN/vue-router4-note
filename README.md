# Vue Router 4 學習筆記

主要根據 Vue Router 4 官方文檔整理的學習筆記，方便查閱。

## 官方文檔

> https://router.vuejs.org/ <br> https://router.vuejs.org/zh/

## 目錄

- [安裝 Vue Router](#安裝-vue-router)

- [基礎配置](#基礎配置)

- [操作存取路由](#操作存取路由)

- [動態參數路由](#動態參數路由)

  - [基礎使用](#基礎使用)

  - [多個動態參數](#多個動態參數)

  - [使用自定義正則表達式](#使用自定義正則表達式)

- [命名路由](#命名路由)

- [巢狀路由](#巢狀路由)

- [編程式導航](#編程式導航)

- [命名視圖](#命名視圖)

- [重新導向和別名](#重新導向和別名)

- [傳遞 props 給路由組件](#傳遞-props-給路由組件)

- [Active links](#active-links)

- [不同的歷史模式](#不同的歷史模式)

## 安裝 Vue Router

### 1. 基於 Vite 創建新專案

在環境安裝時選擇添加使用 Vue Router 即可。

```bash
npm create vue@latest
```

![圖片01](./images/01.PNG)

Vue Router 相關文件夾：

![圖片02](./images/02.PNG)

項目運行結果：

![install-1.gif](./images/gif/install-1.gif)

### 2. 現有專案新增安裝

安裝完成後需要自己配置相關文件，參考下面的[基礎配置](#基礎配置)。

```bash
npm install vue-router@4
```

![圖片03](./images/03.PNG)

## 基礎配置

### 1. 新增路由頁面文件

在 src 下建立 views 資料夾，通常路由相關的頁面會放置在此。

![圖片04](./images/04.PNG)

views 資料夾下新增 Home、About 頁面：

- Home.vue

  ```vue
  <template>
    <h2>Home page</h2>
  </template>
  ```

- About.vue

  ```vue
  <template>
    <h2>About page</h2>
  </template>
  ```

![圖片05](./images/05.PNG)

### 2. 創建路由配置文件

在 src 下建立 router 資料夾，並新增 index.js 文件。

![圖片06](./images/06.PNG)

設定路由配置 index.js：

> 動態導入(懶加載)相關介紹可以查看此[官方文檔](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)。

```javascript
import { createRouter, createWebHistory } from 'vue-router';
// 靜態導入
import Home from '@/views/Home.vue';

// 配置路由規則
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // 動態導入(懶加載)
    component: () => import('@/views/About.vue'),
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
```

### 3. main.js 引入並使用路由實例

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
```

### 4. App.vue 內設定路由連結及顯示

Vue Router 提供了 `<router-link>` 及 `<router-view>` 兩個全域註冊的組件：

- `<router-link>` 組件

  創建路由連結，也可以使用 `<RouterLink>`。

  屬性：

  - to -> 跳轉的路由地址，值為字串或一個物件。

  - replace -> 設置後，會調用 `router.replace()` 而不是 `router.push()`。

    > `replace` 沒有歷史紀錄不可返回，`push` 可以返回。

  - active-class -> 設置連結配對後應用的 class，默認為 `router-link-active`。

  - exact-active-class -> 設置連結準確配對時應用的 class，默認為 `router-link-exact-active`。

- `<router-view>` 組件

  **顯示路由切換頁面的地方**，也可以使用 `<RouterView>`。

設置 App.vue：

```vue
<script setup></script>

<template>
  <h1>Hello Vue Router4!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>

  <nav>
    <router-link to="/">Go to Home</router-link> |
    <router-link to="/about">Go to About</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>
```

> 在模板中也可以透過 `$route` 來獲取當前路由資料。

### 5. 運行專案結果

![router-1.gif](./images/gif/router-1.gif)

## 操作存取路由

在組件中我們可以透過幾個方法獲取路由實例和當前路由資料。

### 1. `<template>` 模板中

在組件模板中可以透過 `$router`、`$route` 操作存取路由。

- `$router` -> 路由實例，可以用來進行動態的路由操作。

- `$route` -> 包含當前路由資料的物件

About.vue 模板中操作存取路由：

```vue
<template>
  <h2>About page</h2>
  <hr />
  <h3>Current Route Information</h3>
  <p>Path: {{ $route.path }}</p>
  <p>Path: {{ $route.name }}</p>

  <button @click="$router.push('/')">Back to Home</button>
</template>
```

渲染結果：

![router-2.gif](./images/gif/router-2.gif)

### 2. `<script setup>` 中

在 `<script setup>` 中則可以透過使用 `useRouter()`、`useRoute()` 來執行相同的功能。

- `useRouter()` -> 獲取路由實例，可以用來進行動態的路由操作。

- `useRoute()` -> 返回包含當前路由資料的物件

Home.vue `<script setup>` 中操作存取路由：

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <h2>Home page</h2>
  <hr />
  <h3>Current Route Information</h3>
  <p>Path: {{ route.path }}</p>
  <p>Name: {{ route.name }}</p>

  <button @click="router.push('/about')">Go to About</button>
</template>
```

渲染結果：

![router-3.gif](./images/gif/router-3.gif)

## 動態參數路由

當需要在**同一規則的路由中對應到相同的頁面組件**時，例如一個 User 組件會根據不同的 userId 渲染不同的 User 資料，這時候就可以使用動態參數路由來實現。

將路由中動態參數的部分使用 `:` 開頭命名，當路由匹配時，動態參數的值將會透過 `route.params` 暴露給組件使用，取得對應的 `params` 後即可以搭配 API 取得特定資料顯示在頁面上。

### 基礎使用

#### § 1. 動態參數路由配置 (router/index.js)

```javascript
//...

// 配置路由規則
const routes = [
  //...
  {
    path: '/users/:userId',
    name: 'User',
    component: () => import('@/views/User.vue'),
  },
];

//...
```

#### § 2. 設置路由切換 (App.vue)

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/users/1">Go to User 1</router-link> |
    <router-link to="/users/2">Go to User 2</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>
```

#### § 3. User.vue 中取得路由動態參數

可以透過前面介紹的[操作存取路由](#操作存取路由)中的路由實例 (`route`) 的 `params` 來獲取對應的動態參數。

```vue
<script setup>
import { useRoute } from 'vue-router';
import { watch, onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
  console.log(`onMounted userId: ${route.params.userId}`);
});

watch(
  () => route.params.userId,
  (newId, oldId) => {
    console.log(`newId: ${newId} , oldId: ${oldId}`);
  }
);
</script>

<template>
  <h2>User page</h2>
  <hr />
  <p>UserId: {{ route.params.userId }}</p>
</template>
```

渲染結果：

![router-4.gif](./images/gif/router-4.gif)

> 需要注意的是，當動態參數路由切換從 /users/1 跳轉至 /users/2 時，**會複用 User 的組件實例並不會進行銷毀，因此生命週期鉤子將不會被再次調用**，若需要獲取 `route` 的變化可以透過 `watch` 來實現 (上面的範例)。

#### § 4. `onBeforeRouteUpdate` 路由導航守衛

除了使用 `watch` 之外，也可以在組件內另外調用 `onBeforeRouteUpdate` 路由導航守衛，來獲取當前路由變化。

```vue
<script setup>
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
  console.log(`onMounted userId: ${route.params.userId}`);
});

onBeforeRouteUpdate((to, from) => {
  const userId = to.params.userId;
  console.log(`onBeforeRouteUpdate userId: ${userId}`);
});
</script>

<template>
  <h2>User page</h2>
  <hr />
  <p>UserId: {{ route.params.userId }}</p>
</template>
```

渲染結果：

![router-5.gif](./images/gif/router-5.gif)

---

### 多個動態參數

也可以設置多個路由動態參數。例如：`/users/:userId/posts/:postId`。

#### § 1. 動態參數路由配置 (router/index.js)

```javascript
//...

// 配置路由規則
const routes = [
  //...
  {
    path: '/users/:userId/posts/:postId',
    name: 'UserPost',
    component: () => import('@/views/UserPost.vue'),
  },
];

//...
```

#### § 2. 設置路由切換 (App.vue)

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/users/1/posts/1">Go to User 1 Post 1</router-link> |
    <router-link to="/users/1/posts/2">Go to User 1 Post 2</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>
```

#### § 3. UserPost.vue 中取得路由動態參數

```vue
<template>
  <h3>
    UserId {{ $route.params.userId }} with post {{ $route.params.postId }}
  </h3>
</template>
```

渲染結果：

![router-6.gif](./images/gif/router-6.gif)

---

### 使用自定義正則表達式

常規的動態參數只匹配 url 片段之間的字符並用 `/` 分隔。如果想匹配**任意路徑**，則需要透過設置動態參數路由**並在參數後的括號中使用自定義正則表達式將其捕獲**。

#### § 設置 404 NotFound 頁面

對於沒有匹配到路由規則的路由，匹配到固定的 NotFound 頁面。

常用寫法：

- `/:pathMatch(.*)`

  可以匹配到不存在的路由地址，通過 `$route.params.pathMatch` 可以獲取傳入的參數值。

- `/:pathMatch(.*)*`

  後面多一個 `*` 代表獲取的 `pathMatch` 會以 `/` 符號為分割符，最後組成一個陣列。

> 注意：路由規則 (routes) 內的順序只有**當路由同時匹配到多個規則時，才是先定義的優先**。

路由配置 (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  //...
  // 設置 404 NotFound 頁面
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

//...
```

設置頁面 NotFound.vue：

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h2>404 Not Found.</h2>
  <p>path: /{{ route.params.pathMatch }}</p>
</template>
```

渲染結果：

![router-7.gif](./images/gif/router-7.gif)

#### § 匹配指定名稱開頭的路由

也可以用相同的寫法設置匹配指定名稱開頭的路由。

以下範例設置匹配 `/user-` 開頭的路由地址，且後面的值會傳入指定的動態參數中(`route.params.afterUser`)。

路由配置 (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  //...
  // 匹配 /user-開頭的路由地址，後面的值傳入 afterUser
  {
    path: '/user-:afterUser(.*)',
    name: 'UserOther',
    component: () => import('@/views/UserOther.vue'),
  },
];

//...
```

設置頁面 UserOther.vue：

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h2>UserOther</h2>
  <p>afterUser value: {{ route.params.afterUser }}</p>
</template>
```

渲染結果：

![router-8.gif](./images/gif/router-8.gif)

#### § 路由的進階匹配語法

更多的匹配語法可以查看此[官方文檔](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html)。

## 命名路由

當設置路由規則時，可以為路由提供 `name` 選項(可選)，**`name` 值必須為唯一值**，若多個路由設定相同的 `name` 值，將只會保留最後一條的設定。

路由規則設置 `name`：

```javascript
//...

// 配置路由規則
const routes = [
  //...
  // 設置 name
  {
    path: '/users/:userId',
    name: 'User',
    component: () => import('@/views/User.vue'),
  },
];

//...
```

連結到指定的命名路由：

可以使用以下兩種方法連結到有命名的路由。

- `<router-link>` 組件的 `to` 屬性：

  可以向 `<router-link>` 組件 `to` 屬性傳遞一個物件，物件內設定 `name` 屬性為指定路由的名稱，也可以設定 `params` 傳遞指定動態參數。

  ```vue
  <template>
    <!-- 省略前面 -->

    <nav>
      <!-- 省略前面 -->
      <router-link :to="{ name: 'User', params: { userId: '1' } }"
        >Go to User 1</router-link
      >
      |
      <router-link :to="{ name: 'User', params: { userId: '2' } }"
        >Go to User 2</router-link
      >
      |
      <!-- 省略 -->
    </nav>

    <main>
      <router-view />
    </main>
  </template>
  ```

- 在 `<script setup>` 內操作路由：

  ```vue
  <script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function goToUser3() {
    router.push({ name: 'User', params: { userId: '3' } });
  }
  </script>

  <template>
    <!-- 省略前面 -->

    <nav>
      <!-- 省略前面 -->
      <button @click="goToUser3">Go to User 3</button> |
      <!-- 省略 -->
    </nav>

    <main>
      <router-view />
    </main>
  </template>
  ```

渲染結果：

![router-9.gif](./images/gif/router-9.gif)

## 巢狀路由

當應用的 UI 由多層的組件組成，通常會需要對應的巢狀結構。例如：`/user/1/profile`、`/user/1/posts`，需要在 User 組件內分別顯示 Profile 和 Posts 組件。

![圖片07](./images/07.PNG)

### 基本設定

#### § 1. 添加巢狀路由配置 (router/index.js)

在對應路由中透過添加 `children` 來設定對應的巢狀路由。

```javascript
//...

// 配置路由規則
const routes = [
  //...
  // 設置 children
  {
    path: '/users/:userId',
    name: 'User',
    component: () => import('@/views/User.vue'),
    children: [
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
];

//...
```

> 注意：若巢狀路由以 `/` 開頭，則代表以**根路徑為上層**，這樣可以讓你使用組件嵌套但不需要使用上層組件的 url。

設置頁面 UserProfile.vue：

```vue
<template>
  <h3>User {{ $route.params.userId }} Profile</h3>
</template>
```

設置頁面 UserPosts.vue：

```vue
<template>
  <h3>User {{ $route.params.userId }} Posts</h3>
</template>
```

#### § 2. 組件內添加巢狀路由顯示 (User.vue)

User 組件內可以新添加自己的 `<router-view>` 組件來渲染對應巢狀路由的組件。

```vue
<!-- 省略前面 -->
<template>
  <h2>User page</h2>
  <hr />
  <p>UserId: {{ route.params.userId }}</p>

  <section class="info_wrapper">
    <router-view />
  </section>
</template>

<style scoped>
.info_wrapper {
  border: 1px solid black;
  padding: 10px;
}
</style>
```

#### § 3. 設置路由切換 (App.vue)

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/users/1/profile">Go to User 1 Profile</router-link> |
    <router-link to="/users/1/posts">Go to User 1 Posts</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>
```

渲染結果：

![router-10.gif](./images/gif/router-10.gif)

#### § 4. 巢狀路由陣列添加空路徑匹配

此時可以發現訪問 `/users/1` 時，在 User 的 `<router-view>` 內甚麼都不會顯示，這是因為沒有匹配到對應的巢狀路由，如果想要在 `/users/1` 也渲染一些東西，可以設置一個空的巢狀路由來匹配。

**另外需要注意通常巢狀路由的命名都會設置在子路由，這將確保 `/users/:userId` 永遠會顯示對應的巢狀路由。**

```javascript
//...

// 配置路由規則
const routes = [
  //...
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
];

//...
```

設置頁面 UserHome.vue：

```vue
<template>
  <h3>User {{ $route.params.userId }} Home</h3>
</template>
```

渲染結果：

![router-11.gif](./images/gif/router-11.gif)

---

### 省略嵌套父組件 (版本 4.1+)

也可以透過**省略嵌套父組件( `component` )的設定，使巢狀路由變成共用的路徑前綴**，方便進行路徑分組或其他更進階的功能。

此時因為未設定嵌套的父組件，因此上一層的 `<router-view>` 會直接以子路由設定的組件替代顯示。

```javascript
//...

// 配置路由規則
const routes = [
  //...
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
];

//...
```

渲染結果：

![router-12.gif](./images/gif/router-12.gif)

## 編程式導航

除了使用 `<router-link>` 創建 a 標籤來定義導航連結，還可以使用 `router` 的實例方法來進行編程式導航。

以下的範例中的 `router` 皆指代路由器實例，在 `<script setup>` 中則可以通過調用 `useRouter()` 來取得路由器實例。

### 導航到不同的位置

想要導航到不同的 url，可以使用 `router.push` 方法，這個方法會向 `history stack` 添加新的紀錄，因此當使用者點擊瀏覽器的返回鍵時，會回到之前的 url。

一般點擊 `<router-link :to="...">` 的連結時，內部也是調用 `router.push(...)`。而 `push` 方法的參數跟 `<router-link>` 的 `to` 屬性一樣，可以是**一個字串路徑或是一個描述地址的物件**。

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 編程式導航
function goToUser4() {
  // 字串路徑
  router.push('/users/4');
}
function goToUser5() {
  // 帶有路徑 (path) 的物件
  router.push({ path: '/users/5' });
}
function goToUser6() {
  // 使用命名路由，並透過 params 添加參數
  router.push({ name: 'User', params: { userId: '6' } });
}
function goToAboutWithQuery() {
  // 透過 query 添加查詢參數，結果為 /about?plan=private
  router.push({ path: '/about', query: { plan: 'private' } });
}
function goToAboutWithHash() {
  // 帶 hash，結果為 /about#team
  router.push({ path: '/about', hash: '#team' });
}
</script>

<template>
  <!-- 省略前面 -->

  <section>
    <p>Programmatic Navigation</p>
    <button @click="goToUser4">Go to User 4</button> |
    <button @click="goToUser5">Go to User 5</button> |
    <button @click="goToUser6">Go to User 6</button> |
    <button @click="goToAboutWithQuery">Go to About With Query</button> |
    <button @click="goToAboutWithHash">Go to About With Hash</button>
  </section>

  <main>
    <router-view />
  </main>
</template>
```

渲染結果：

![router-13.gif](./images/gif/router-13.gif)

需要特別注意 **`path` 和 `params` 不能同時使用，如果設置了 `path`，`params` 會被忽略**，而 `query` 則不會，因此需要使用命名路由，或是手寫完整帶有參數的 `path`。

```javascript
const userId = '1';
// 手動自己拼接完整的參數 url -> /users/1
router.push(`/users/${userId}`);
// 使用 path ，結果與上方一樣
router.push({ path: `/users/${userId}` });

// 使用命名路由 name 搭配 params -> /users/1
router.push({ name: 'User', params: { userId } });
// path 和 params不能同時使用，會忽略 params -> /users
router.push({ path: '/users', params: { userId } });
```

當指定 `params` 時，可以提供 `string` 或是 `number` 類型的參數 (或者對於 **"可重複的參數"** 可以提供一個陣列)，而提供任何其他類型 (物件、布林等等) 都將被**自動字串化**，而對於**可選參數**則可以提供一個空字串 (`""`) 或 `null` 來移除它。

而 `router.push` 和其他導航方法都會返回一個 `Promise`，讓我們可以等到導航完成後才知道是否成功，以便進行額外的操作( [Navigation Handling](https://router.vuejs.org/zh/guide/advanced/navigation-failures.html) 中會詳細說明)。

> 補充資料：
> [可重複參數](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0)、[可選參數](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%80%89%E5%8F%82%E6%95%B0)。

---

### 替換當前位置

使用 `router.replace` 方法，類似於 `router.push`，但是它不會向 `history stack` 添加新紀錄，而是**直接取代當前的 `history` 紀錄，因此按返回鍵將不會回到當前頁面**。

當 `<router-link>` 設置了 `replace` 時，點擊 `<router-link :to="..." replace>` 的連結，內部會調用`router.replace(...)`。

另外也可以直接在傳遞給 `router.push` 的參數中增加一個屬性 `replace: true`。

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 省略...
// 替換當前位置
function goToHomeReplace() {
  // router.push({ path: '/', replace: true });
  // 相當於
  router.replace({ path: '/' });
}
</script>

<template>
  <!-- 省略前面 -->

  <section>
    <p>Programmatic Navigation</p>
    <!-- 省略前面 -->
    <button @click="goToHomeReplace">Go to Home (replace)</button>
  </section>

  <main>
    <router-view />
  </main>
</template>
```

渲染結果：

![router-14.gif](./images/gif/router-14.gif)

---

### 跨越 history

`router.go` 方法將接收一個整數作為參數，表示在 `history stack` 中前進或後退多少步，類似於 `window.history.go(n)`。

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 省略...
// 跨越 history
function forward() {
  // 向前移動一條紀錄，與 router.forward() 相同
  router.go(1);
}
function back() {
  // 返回一條紀錄，與 router.back() 相同
  router.go(-1);
}
function goTo(n) {
  // 如果沒有那麼多的紀錄，會靜默失敗
  router.go(n);
}
</script>

<template>
  <!-- 省略前面 -->

  <section>
    <p>Programmatic Navigation</p>
    <!-- 省略前面 -->
    <button @click="forward">forward</button> |
    <button @click="back">back</button> |
    <button @click="goTo(3)">forward 3</button> |
    <button @click="goTo(-100)">back 100</button> |
    <button @click="goTo(100)">forward 100</button>
  </section>

  <main>
    <router-view />
  </main>
</template>
```

渲染結果：

![router-15.gif](./images/gif/router-15.gif)

## 命名視圖

有時會需要同時 (同層) 顯示多個視圖，而不是嵌套視圖。例如創建一個布局，有 sidebar (側邊導航)、main (主內容)，**這時候就可以添加多個 `<router-view>` 組件，並為其指定名稱**，若沒有設定名稱則預設名稱為 `default`。

### 基本設定

#### § 1. 新增命名視圖顯示 (App.vue)

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/settings">Go to Settings</router-link>
  </nav>

  <!-- 省略 -->

  <section class="content">
    <div>
      <!-- 命名視圖 -->
      <router-view name="sidebar" />
    </div>
    <main>
      <router-view />
    </main>
  </section>
</template>

<style scoped>
.content {
  display: flex;
}
main {
  flex: 1;
}
</style>
```

#### § 2. 路由配置 (router/index.js)

一個 `<router-view>` 使用一個組件渲染，因此在路由配置時，需要使用 `components` 設定視圖對應的組件 (與 `<router-view>` 上的 `name` 屬性匹配)。

```javascript
//...

// 配置路由規則
const routes = [
  //...
  // 設置命名視圖
  {
    path: '/settings',
    name: 'Settings',
    components: {
      default: () => import('@/views/Settings.vue'),
      sidebar: () => import('@/views/SettingNav.vue'),
    },
  },
  // ...
];

//...
```

設置頁面 Settings.vue：

```vue
<template>
  <h3>Settings</h3>
</template>
```

設置頁面 SettingNav.vue：

```vue
<template>
  <div class="sidebar">
    <h3>SettingNav</h3>
  </div>
</template>

<style scoped>
.sidebar {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid black;
  min-height: 50vh;
}
</style>
```

渲染結果：

![router-16.gif](./images/gif/router-16.gif)

---

### 搭配巢狀路由

當需要複雜的布局時，例如巢狀路由內需要顯示不同的一個或多個視圖，也可以兩者搭配使用。

#### § 1. 新增巢狀視圖顯示 (Settings.vue)

```vue
<template>
  <h3>Settings</h3>
  <router-view />
  <!-- 命名視圖 -->
  <router-view name="helper" />
</template>
```

#### § 2. 設置連結 (SettingNav.vue)

```vue
<template>
  <div class="sidebar">
    <h3>SettingNav</h3>
    <router-link to="/settings/email">email</router-link>
    <router-link to="/settings/profile">profile</router-link>
  </div>
</template>

<style scoped>
.sidebar {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid black;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
}
</style>
```

#### § 3. 巢狀路由命名視圖配置 (router/index.js)

在子路由中一樣使用 `components` 指定視圖對應組件即可。

```javascript
//...

// 配置路由規則
const routes = [
  //...
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
  // ...
];

//...
```

設置頁面 SettingEmail.vue：

```vue
<template>
  <div class="wrapper">
    <h3>SettingEmail</h3>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
  min-height: 30vh;
}
</style>
```

設置頁面 SettingProfile.vue：

```vue
<template>
  <div class="wrapper">
    <h3>SettingProfile</h3>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
  min-height: 30vh;
}
</style>
```

設置頁面 SettingHelper.vue：

```vue
<template>
  <div class="helper">
    <h3>SettingHelper</h3>
  </div>
</template>

<style scoped>
.helper {
  min-height: 10vh;
  padding: 10px;
  background-color: lightblue;
}
</style>
```

渲染結果：

![router-17.gif](./images/gif/router-17.gif)

## 重新導向和別名

### 重新導向 redirect

可以通過路由配置來將匹配的路由導向其他目標路由。例如：將 `/home` 重新導向到 `/`。

需要注意的是**導航守衛並不會應用在跳轉路由上**，因此在跳轉路由( `/home` )中添加 `beforeEnter` 守衛不會有任何效果。

#### § 1. 直接指定路由地址

```javascript
//...

// 配置路由規則
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // 設置重新導向
  {
    path: '/home',
    redirect: '/',
    // 也可以使用命名路由
    // redirect: { name: 'Home' },
  },
  // ...
];

//...
```

渲染結果：

![router-18.gif](./images/gif/router-18.gif)

#### § 2. 指定一個方法動態返回重新導向的目標

```javascript
//...

// 配置路由規則
const routes = [
  // ...
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
  // ...
];

//...
```

設置頁面 Search.vue：

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h2>Search page</h2>
  <hr />
  <p>Query: {{ route.query }}</p>
</template>
```

渲染結果：

![router-19.gif](./images/gif/router-19.gif)

#### § 3. 相對位置重新導向 (不建議使用)

重新導向的路由地址不使用 `/` 開頭時，**會相對當前 url 地址的位置重新導向**。

以下範例設置 `/info` 正常操作可以重新導向到 `/about`，但是當在錯誤的 url 層級操作時則會導致導向不符合預期，因此**建議使用絕對路由地址或是命名路由**明確重新導向的位置。

設置路由配置 (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
  // 相對位置重新導向 (不建議使用)
  {
    // /info 重新導向到 /about
    path: '/info',
    redirect: 'about',
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  // ...
];

//...
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/info">Go to info</router-link>
  </nav>

  <!-- 省略 -->
</template>
```

渲染結果：

可以看到不同的操作可能會導致錯誤的重新導向。

> 可以查看 [github](https://github.com/vuejs/router/issues/2014) 上成員針對相對位置重新導向可能導致的問題的回覆。

![router-20.gif](./images/gif/router-20.gif)

---

### 別名 alias

通過在路由配置中設定別名 `alias`，可以自由的將 UI 結構對應到一個任意的 url，而不需要受嵌套結構的限制。

與重新導向的差別：

`redirect` 是指當使用者訪問 `/home` 時，url 會被 `/` 替換並匹配路由。

而 `alias` 則是將 `/` 別名設置為 `/home2`，當訪問 `/home2` 時，url 仍然是 `/home2`，但是會被匹配為 `/` 的路由設置。

設置路由配置 (router/index.js)：

```javascript
//...

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
  },
  // ...
];

//...
```

渲染結果：

可以看到兩者使用的差別。

![router-21.gif](./images/gif/router-21.gif)

#### § 進階使用

- 在巢狀路由中設置別名時，若以 `/` 開頭，**可以使路由地址變為絕對路徑**。

- 另外也可以透過**陣列設置多個別名**。

- 若路由有動態參數，**則在絕對路經中需要確保包含動態參數**。

設置路由配置 (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
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
  // ...
];

//...
```

設置頁面 PhotoLayout.vue：

```vue
<template>
  <h3>PhotoLayout</h3>
  <div class="layout">
    <router-view />
  </div>
</template>

<style scoped>
.layout {
  padding: 10px;
  background-color: lightgoldenrodyellow;
}
</style>
```

設置頁面 PhotoDetail.vue：

```vue
<template>
  <h3>PhotoDetail</h3>
  <p>photoId: {{ $route.params.id }}</p>
</template>
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/photo/2">Go to /photo/2</router-link> |
    <router-link to="/photo/6/detail">Go to /photo/6/detail</router-link> |
    <router-link to="/photo-12">Go to /photo-12</router-link>
  </nav>

  <!-- 省略 -->
</template>
```

渲染結果：

![router-22.gif](./images/gif/router-22.gif)

#### § 關於 SEO 的注意事項

使用別名時，建議要定義標準網址 [canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?visit_id=638476681905676047-2189358708&rd=1&hl=zh-tw)。

> 補充文章：[Blog1](https://welly.tw/blog/what-is-canonical-url)、[Blog2](https://www.awoo.ai/zh-hant/blog/canonical-seo/)、[github](https://github.com/vuejs/vue-router/issues/3869)、[@vueuse/head](https://github.com/vueuse/head?tab=readme-ov-file#api)。

以下範例參考上面的補充說明使用 [`@unhead/vue`](https://unhead.unjs.io/setup/vue/installation) 設置 canonical URL。

- 1.安裝 `@unhead/vue`：

  ```bash
  npm install @unhead/vue
  ```

- 2.使用 Plugin (main.js)：

  ```javascript
  import { createApp } from 'vue';
  import App from './App.vue';
  import router from './router';
  import { createHead } from '@unhead/vue';

  const app = createApp(App);

  app.use(router);

  const head = createHead();
  app.use(head);

  app.mount('#app');
  ```

- 3.App.vue 使用 `useHead` 組合式函數設置所有的 canonical URL：

  ```vue
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { useHead } from '@unhead/vue';

  const router = useRouter();
  const route = useRoute();

  // 設置 canonical URL
  useHead({
    link: () => [
      {
        rel: 'canonical',
        href: `${window.location.origin}${route.path}`,
      },
    ],
  });

  // 省略...
  </script>
  ```

- 4.可以在單一頁面中使用 `useHead` 設置指定的標準網址 (PhotoDetail.vue)：

  ```vue
  <script setup>
  import { useRoute } from 'vue-router';
  import { useHead } from '@unhead/vue';

  const route = useRoute();

  // 設置 canonical URL
  useHead({
    link: () => [
      {
        rel: 'canonical',
        href: `${window.location.origin}/photo/${route.params.id}`,
      },
    ],
  });
  </script>

  <template>
    <h3>PhotoDetail</h3>
    <p>photoId: {{ $route.params.id }}</p>
  </template>
  ```

渲染結果：

![router-23.gif](./images/gif/router-23.gif)

## 傳遞 props 給路由組件

在組件中使用 `$route` 和 `useRoute()` 會**造成組件與路由的高耦合**，限制組件的靈活性，因為它只能用於特定的 url。

如以下範例，`ProductDetail` 組件使用了 `$route.params.id` 來獲取 id，因此必須綁定對應的路由地址 ( `/products/:id` ) 來使用。

路由配置 (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
  },
  // ...
];

//...
```

ProductDetail.vue：

```vue
<template>
  <h3>ProductDetail</h3>
  <p>productId: {{ $route.params.id }}</p>
</template>
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/products/1">Go to /products/1</router-link> |
    <router-link to="/products/2">Go to /products/2</router-link>
  </nav>

  <!-- 省略 -->
</template>
```

通過在路由設置 `props` 選項，則可以解除這種限制，允許你在任何地方使用、重用組件，以下分為幾種模式：

### 布林模式

當 `props` 被設置為 `true` 時，`route.params` 將被作為 `props` 傳給組件。

> 注意：此方法無法使用 `query` 帶入參數，請參考下方的[函數模式](#函數模式)。

路由配置 `props` (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
  // 設置 props - 布林模式
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    props: true,
  },
  // ...
];

//...
```

修改組件接收 `props` (ProductDetail.vue)：

```vue
<script setup>
defineProps({
  id: String,
});
</script>

<template>
  <h3>ProductDetail</h3>
  <p>productId: {{ id }}</p>
</template>
```

渲染結果：

![router-24.gif](./images/gif/router-24.gif)

#### § 命名視圖

針對設置了命名視圖的路由，則必須為每個命名視圖定義 `props` 配置：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
  // 設置 props - 布林模式
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
  // ...
];

//...
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/products2/1">Go to /products2/1</router-link> |
    <router-link to="/products2/2">Go to /products2/2</router-link>
  </nav>

  <!-- 省略 -->
</template>
```

渲染結果：

![router-25.gif](./images/gif/router-25.gif)

---

### 物件模式

當 `props` 設置為物件時，**它將會依照原樣作為 `props` 傳給組件**，`props` 為**靜態資料 (固定參數)** 的時候很有用。設置了命名視圖的路由一樣必須為每個命名視圖定義 `props` 配置。

路由配置 `props` (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
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
  // ...
];

//...
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/products">Go to /products</router-link> |
    <router-link to="/products2">Go to /products2</router-link>
  </nav>

  <!-- 省略 -->
</template>
```

渲染結果：

![router-26.gif](./images/gif/router-26.gif)

---

### 函數模式

可以創建一個返回 `props` 的函數，該函數會傳入一個 `route` 物件參數，這允許你將參數轉換為其他類型，或是將靜態值與基於路由的值相結合等等。

路由配置 `props` (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
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
  // ...
];

//...
```

ProductFind.vue：

```vue
<script setup>
const props = defineProps({
  title: String,
  category: String,
  isFind: Boolean,
});
</script>

<template>
  <h3>ProductFind</h3>
  <p>props data: {{ props }}</p>
</template>
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/find?t=vue&c=book">Go to /find?t=vue&c=book</router-link>
    |
    <router-link to="/find?t=ps5&c=game">Go to /find?t=ps5&c=game</router-link>
  </nav>

  <!-- 省略 -->
</template>
```

渲染結果：

![router-27.gif](./images/gif/router-27.gif)

---

### 通過 `<router-view>` 插槽 (不建議)

也可以通過 `<router-view>` 插槽 (slot) 傳遞參數。

但是在這種情況下，如以下範例所示，所有的路由組件都會傳遞 `view-prop`，這表示**所有的路由組件內部都聲明了接收一個 `view-prop` 的 prop，但這未必需要，因此請盡可能使用上面其他的選項**。

```vue
<template>
  <!-- 省略前面 -->

  <router-view v-slot="{ Component }">
    <component :is="Component" view-prop="value" />
  </router-view>

  <!-- 省略 -->
</template>
```

## Active links

通常應用中會具有使用多個 `<router-link>` 組件形成的導航清單，而 `<router-link>` 提供了 `router-link-active` 以及 `router-link-exact-active` 兩個 CSS class 方便設置 active links 的樣式。

### 連結何時 active

active 狀態時會添加 `router-link-active` class。

在以下情況下，`<router-link>` 被視為處於 active 狀態：

- 它匹配與目前 url 相同的路由配置

- `params` 具有與目前 url 相同的值，不考慮其他路由屬性，例如 `query`

- 使用巢狀路由時，如果相關的 `params` 匹配，則任何指向祖先路由的連結也將被視為 active 狀態。

- 路徑不一定需要完美匹配，使用別名 ( `alias` ) 也會視為匹配，只要能對應到相同的路由配置和 `params`。

- 如果路由設置了 `redirect` 屬性，則檢查連結是否處於 active 狀態時會忽略該路由。

#### § 設置路由 active 樣式 (App.vue)：

```vue
<!-- 省略 -->
<!-- 添加連結樣式 -->
<style>
a {
  color: darkblue;
}
.router-link-active {
  color: lightcoral;
}
.router-link-exact-active {
  color: red;
}
</style>
```

渲染結果：

可以看到連結會根據 active 狀態顯示對應的樣式。

![router-28.gif](./images/gif/router-28.gif)

---

### 精確的 active 連結 (Exact active links)

精確匹配的連結會添加 `router-link-exact-active` class，**但是精確匹配不包括祖先路由**。

#### § 範例

路由配置 (router/index.js)：

```javascript
//...

// 配置路由規則
const routes = [
  // ...
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
  // ...
];

//...
```

設置頁面 Students.vue：

```vue
<template>
  <h3>Students name: {{ $route.params.name }}</h3>
  <section class="wrapper">
    <div class="sidebar">
      <h3>Work Nav</h3>
      <router-link :to="`/students/${$route.params.name}/works/1`"
        >work 1</router-link
      >
      <router-link :to="`/students/${$route.params.name}/works/2`"
        >work 2</router-link
      >
    </div>
    <div class="content">
      <router-view />
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  margin-top: 10px;
  display: flex;
  min-height: 20vh;
}
.sidebar {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 10px;
  border: 1px solid black;
  background-color: lightseagreen;
}
</style>
```

設置頁面 StudentWork.vue：

```vue
<template>
  <h3>StudentWork</h3>
  <p>workId: {{ $route.params.workId }}</p>
</template>
```

設置路由切換 (App.vue)：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link to="/students/123">Go to /students/123</router-link> |
    <router-link to="/students/456">Go to /students/456</router-link>
  </nav>

  <!-- 省略 -->
</template>

<!-- 省略 -->
```

渲染結果：

以上範例中，當當前 url 路徑為 `/students/123/works/1` 時，App.vue (`/students/123`) 及 Students.vue (`/students/123/works/1`) 的兩個連結都將被視為 active 狀態，因此 `router-link-active` 會應用到兩個連結上。

但只有 Students.vue (`/students/123/works/1`) 的連結會被認為是精確的，因此 `router-link-exact-active` 只會應用到此連結。

![router-29.gif](./images/gif/router-29.gif)

---

### 配置 active class 名稱

#### § 1.修改指定連結的 active class

`<router-link>` 組件具有 `active-class` 和 `exact-active-class` 兩個屬性，可以用來變更套用 active 狀態的 class 名稱。

Students.vue：

```vue
<template>
  <h3>Students name: {{ $route.params.name }}</h3>
  <section class="wrapper">
    <div class="sidebar">
      <h3>Work Nav</h3>
      <router-link
        :to="`/students/${$route.params.name}/works/1`"
        active-class="link-active-green"
        exact-active-class="link-exact-active-green"
        >work 1</router-link
      >
      <router-link
        :to="`/students/${$route.params.name}/works/2`"
        active-class="link-active-green"
        exact-active-class="link-exact-active-green"
        >work 2</router-link
      >
    </div>
    <div class="content">
      <router-view />
    </div>
  </section>
</template>

<!-- 省略 -->
```

App.vue：

```vue
<template>
  <!-- 省略前面 -->

  <nav>
    <!-- 省略前面 -->
    <router-link
      to="/students/123"
      active-class="link-active-green"
      exact-active-class="link-exact-active-green"
      >Go to /students/123</router-link
    >
    |
    <router-link
      to="/students/456"
      active-class="link-active-green"
      exact-active-class="link-exact-active-green"
      >Go to /students/456</router-link
    >
  </nav>

  <!-- 省略 -->
</template>

<!-- 省略 -->
<style>
/* 省略 */
/* 添加指定連結樣式 */
.link-active-green {
  color: lightseagreen;
}
.link-exact-active-green {
  color: green;
}
</style>
```

渲染結果：

現在可以看到 active 狀態套用的 class 為指定的名稱。

![router-30.gif](./images/gif/router-30.gif)

#### § 2.全域更改預設 active class

也可以透過將 `linkActiveClass` 和 `linkExactActiveClass` 選項傳遞給 `createRouter()` 來全域更改預設 active class 名稱。

全域更改 active class 名稱 (router/index.js)：

```javascript
//...

// 創建路由實例
const router = createRouter({
  // 指定模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 設定前面配置的路由
  routes,
  // 指定 active class
  linkActiveClass: 'link-active-green',
  linkExactActiveClass: 'link-exact-active-green',
});

//...
```

渲染結果：

現在全部的連結樣式都被修改。

![router-31.gif](./images/gif/router-31.gif)

## 不同的歷史模式

在 `createRouter()` 時可以透過 `history` 選項配置選擇不同的歷史模式，Vue-Router 4 預設的是 `createWebHistory()`。

### Hash 模式

[💻Demo](https://ypinpin.github.io/vue-router-test/) | [📝Code](https://github.com/YPINPIN/vue-router-test)

`history` 設置 `createWebHashHistory()`，它在傳遞實際 url 之前使用了一個 `#` (hash) 字元，利用 `#` 做頁面的切換。這種模式因為 url 未被發送至伺服器，所以**不需要在伺服器端上進行配置處理**，但是由於添加了 `#` (hash)，**因此在 SEO 中存在一些問題**，若擔心這個問題則可以使用 HTML5 模式。

```javascript
import { createRouter, createWebHashHistory } from 'vue-router';
//...

// 創建路由實例
const router = createRouter({
  // 指定模式
  history: createWebHashHistory(),
  // 設定前面配置的路由
  routes,
});

//...
```

![router-32.gif](./images/gif/router-32.gif)

想修改預設路徑( `base` )可以參考此[官方文檔](https://router.vuejs.org/api/#createWebHashHistory)、[範例 code](https://github.com/YPINPIN/vue-router-test/commit/2a118c62d787bc118ecf192fc4a11f589a50e037)。

![router-33.gif](./images/gif/router-33.gif)

---

### HTML5 模式

`history` 設置 `createWebHistory()`，基於 History API，**這種模式實現頁面跳轉不需要重新載入頁面，且 url 看起來更加直觀不會添加特殊字元**，例如：`https://example.com/user/id`。修改路徑的方式與 Hash 模式相同，可以傳遞參數給 `createWebHistory()`，[官方文檔](https://router.vuejs.org/api/#createWebHistory)。

如果應用程序可能在不同的 URL 路徑下運行（如子目錄或子網站），就建議使用 `import.meta.env.BASE_URL` 這個參數來設置應用程序的根路徑，詳細說明可以查看 [Vite 官方文檔](https://cn.vitejs.dev/guide/env-and-mode)。若無任何子目錄則可寫 `history: createWebHistory()`。

```javascript
import { createRouter, createWebHistory } from 'vue-router';
//...

// 創建路由實例
const router = createRouter({
  // 指定模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 設定前面配置的路由
  routes,
});

//...
```

![router-34.gif](./images/gif/router-34.gif)

但是使用此模式時，**必須要在伺服器端進行一些配置**，不然使用者在瀏覽器中直接訪問 `https://example.com/user/id` 時，伺服器將找不到對應路徑，並會返回一個 404 錯誤。

而要解決這個問題需要在伺服器上添加配置，當 url 不匹配任何資源時，它將提供與應用中 index.html 相同的頁面。

#### § 伺服器配置

可以參考此[官方文檔](https://router.vuejs.org/guide/essentials/history-mode.html#Example-Server-Configurations)。

- 使用 Vercel 部屬的範例：

  [💻Demo](https://vue-router-test-eight.vercel.app/) | [📝Code](https://github.com/YPINPIN/vue-router-test/tree/modeHTML)

  > [vercel 相關文檔](https://vercel.com/docs/frameworks/vite#using-vite-to-make-spas)

  需要注意的是，伺服器端將不再報告 404 錯誤，因為現在所有未對應的路徑都會顯示你的 index.html 文件。因此需要在 Vue 應用中添加一個路由來匹配顯示 404 頁面。

  ```javascript
  import { createRouter, createWebHistory } from 'vue-router';
  //...

  // 配置路由規則
  const routes = [
    //...
    // 設置 404 NotFound 頁面
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ];

  //...
  ```

  部屬結果：

  ![router-35.gif](./images/gif/router-35.gif)

#### § GitHub Page 配置 HTML5 模式出現 404 錯誤

因為 github 無法幫開發者進行路由對應，因此建議改用 Hash 模式或是使用其他託管平台，例如：Netlify、Vercel。

更多說明可以參考此 [github discussions](https://github.com/orgs/community/discussions/36908)、[stackoverflow](https://stackoverflow.com/questions/48521177/404-when-reloading-a-vue-website-published-to-github-pages)。

---

### Memory 模式

`history` 設置 `createMemoryHistory()`，不會修改 url，路由地址只存在記憶體中，**因此沒有歷史紀錄，無法使用上一頁/下一頁，刷新頁面則會回到首頁**。較適合 Node 環境以及 SSR。

```javascript
import { createRouter, createMemoryHistory } from 'vue-router';
//...

// 創建路由實例
const router = createRouter({
  // 指定模式
  history: createMemoryHistory(),
  // 設定前面配置的路由
  routes,
});

//...
```

![router-36.gif](./images/gif/router-36.gif)
