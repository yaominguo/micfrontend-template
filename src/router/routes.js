const Layout = () => import('@/components/Layout')
const Test = () => import('@/views/test')
const Home = () => import('@/views/home')
const ErrorPage = () => import('@/views/error')

export default [
  {
    path: '*',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/portal-home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
        }
      },
      {
        path: '/test',
        name: 'test',
        component: Test,
        meta: {
          title: 'test',
        }
      },
      // {
      //   path: '/aaa',
      //   name: 'aaa',
      //   meta: {
      //     title: 'aaa',
      //   },
      //   children: [
      //     {
      //       path: '/aaa/register',
      //       name: 'register',
      //       meta: {
      //         title: '注册'
      //       }
      //     }
      //   ]
      // },
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage,
  },
  {
    path: '/logout',
    name: 'logout',
    component: ErrorPage,
  },
]
