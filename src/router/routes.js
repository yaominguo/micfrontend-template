const Layout = () => import('@/components/Layout')
const Info = () => import('@/views/info')
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
        path: '/info',
        name: 'info',
        component: Info,
        meta: {
          title: '用户信息',
        }
      },
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
