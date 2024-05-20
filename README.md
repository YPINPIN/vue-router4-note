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

![router-8.gif](./images/gif/router-8.gif)

#### § 路由的進階匹配語法

更多的匹配語法可以查看此[官方文檔](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html)。
