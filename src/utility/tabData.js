import { reactive } from 'vue';
import NavLink_1 from '@/components/NavLink_1.vue';
import NavLink_2 from '@/components/NavLink_2.vue';
import NavLink_3 from '@/components/NavLink_3.vue';
import NavLink_4 from '@/components/NavLink_4.vue';
import NavLink_5 from '@/components/NavLink_5.vue';
import NavLink_6 from '@/components/NavLink_6.vue';
import NavLink_7 from '@/components/NavLink_7.vue';
import NavLink_8 from '@/components/NavLink_8.vue';
import NavLink_9 from '@/components/NavLink_9.vue';
import NavLink_10 from '@/components/NavLink_10.vue';
import NavLink_11 from '@/components/NavLink_11.vue';
import NavLink_12 from '@/components/NavLink_12.vue';
import NavLink_13 from '@/components/NavLink_13.vue';
import NavLink_14 from '@/components/NavLink_14.vue';
import NavLink_15 from '@/components/NavLink_15.vue';
import NavLink_16 from '@/components/NavLink_16.vue';
import NavLink_17 from '@/components/NavLink_17.vue';
import NavLink_18 from '@/components/NavLink_18.vue';
import NavLink_19 from '@/components/NavLink_19.vue';
import NavLink_20 from '@/components/NavLink_20.vue';
import NavLink_21 from '@/components/NavLink_21.vue';
import NavLink_22 from '@/components/NavLink_22.vue';

export const tabs = {
  Demo1: { name: '操作存取路由', comp: NavLink_1 },
  Demo2: { name: '動態參數路由-基礎使用', comp: NavLink_2 },
  Demo3: { name: '動態參數路由-多個動態參數', comp: NavLink_3 },
  Demo4: { name: '動態參數路由-自定義正則表達式', comp: NavLink_4 },
  Demo5: { name: '命名路由', comp: NavLink_5 },
  Demo6: { name: '巢狀路由', comp: NavLink_6 },
  Demo7: { name: '省略嵌套父組件 (版本 4.1+)', comp: NavLink_7 },
  Demo8: { name: '編程式導航', comp: NavLink_8 },
  Demo9: { name: '命名視圖', comp: NavLink_9 },
  Demo10: { name: '重新導向和別名', comp: NavLink_10 },
  Demo11: { name: '傳遞 props 給路由組件', comp: NavLink_11 },
  Demo12: { name: 'Active links', comp: NavLink_12 },
  Demo13: { name: '導航守衛-全局前置守衛', comp: NavLink_13 },
  Demo14: { name: '導航守衛-全局解析守衛 & 全局後置鉤子', comp: NavLink_14 },
  Demo15: {
    name: '導航守衛-針對單個路由的守衛 & 組件內的守衛',
    comp: NavLink_15,
  },
  Demo16: { name: '路由元信息', comp: NavLink_16 },
  Demo17: { name: '數據獲取的方式', comp: NavLink_17 },
  Demo18: { name: 'router-view 插槽', comp: NavLink_18 },
  Demo19: { name: '過渡動畫效果', comp: NavLink_19 },
  Demo20: { name: '滾動行為 (Scroll Behavior)', comp: NavLink_20 },
  Demo21: { name: '擴展 router-link', comp: NavLink_21 },
  Demo22: { name: '導航結果', comp: NavLink_22 },
};

export const currentTab = reactive({
  value: 'Demo1',
  set(newVal) {
    if (!tabs[newVal]) {
      this.set('Demo1');
      return;
    }
    this.value = newVal;
    sessionStorage.setItem('currentTab', newVal);
  },
});
