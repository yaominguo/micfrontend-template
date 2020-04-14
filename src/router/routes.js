const Layout = () => import('@/components/Layout')
const test = () => import('@/views/test')
const home = () => import('@/views/home')

export default [
  {
    path: '/*',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/portal-home',
        name: 'home',
        component: home,
        meta: {
          title: '首页',
        }
      },
      {
        path: '/test',
        name: 'test',
        component: test,
        meta: {
          title: 'test',
        }
      },
      {
        path: '/aaa',
        name: 'aaa',
        meta: {
          title: 'aaa',
        }
      }
    ]
  },
]
