const Layout = () => import('@/components/Layout')
const test = () => import('@/test')

export default [
  {
    path: '/*',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
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
