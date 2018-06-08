const index = () =>
    import('@/components/index/index');

const modeBottomDetail = () =>
    import('@/components/index/index-main/modeBottomDetail');

let indexArr=[
    {
      path: '/',//首页模块
      name: 'index',
      component: index,
      meta: {
        requiresAuth: true
      }
    },
    {
        path: "/modeBottomDetail",
        component: modeBottomDetail,
        meta: {
            requiresAuth: true
        }
    }
]
export default indexArr