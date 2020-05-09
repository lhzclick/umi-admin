import { defineConfig,dynamic } from 'umi';



export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: './',
  history: {
    type: 'hash'
  },
  antd: {
    // dark: true,
    // compact: true,
  },
  dva: {
    hmr: true,
    immer:true,
  },
  dynamicImport: {},
  routes: [
    { 
      path: '/login', 
      component: '@/pages/login/index' 
    },
    { 
      path: '/', 
      component: '@/layouts/index',
      routes:[
        {
          path: '/', 
          redirect: '/index' 
        },
        {
          path: '/index',
          component: 'index',
        },
        {
          path: '/test',
          component: 'test',
        },
      ]
    },
  ],
});
