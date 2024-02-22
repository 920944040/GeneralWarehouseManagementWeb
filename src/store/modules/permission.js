import { asyncRoutes, constantRoutes } from '@/router'
import { getPermissionMenu } from '@/api/user'// 【新加入】引入请求，后面有文件，先不慌
import Layout from '@/layout'// 【新加入】引入layout
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

// 这里是因为我之前没用动态菜单的时候报错，从网上搜的，改了点，好像也不太重要
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    if (route.meta.roles.indexOf(roles) > -1) {
      return true
    } else {
      return false
    }
    // return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export function creteMenu(routes, data) {
  if (data !== undefined) {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const menu = {
          path: data[i].url,
          component: Layout,
          redirect: data[i].redirect,
          children: childrenMenu(data[i].children),
          alwaysShow: true,
          name: data[i].name,
          meta: data[i].mate
        }
        routes.push(menu)
      }
    }
  }
}

export function childrenMenu(data) {
  const res = []
  if (data !== undefined) {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const menu = {
          path: data[i].url,
          component: (resolve) => require([`@/views${data[i].url}`], resolve),
          name: data[i].name,
          meta: data[i].mate,
          children: childrenMenu(data[i].children)
        }
        res.push(menu)
      }
    }
  }
  return res
}

// 不看
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
// 不看
const state = {
  routes: [],
  addRoutes: []
}
// 不看
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      // 【新加入】开始
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由，getRoutes（state.token）后面会写
      const token = getToken()
      getPermissionMenu(token).then(response => {
        // let data = response
        // 我的code为200为正常
        if (response.code !== 200) {
          Message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          // 获取目录的json
          // data = response.data
          // 把data的数据拷贝到loadMenuData里面
          const routess = response.data
        //   const routesss = JSON.parse(routess)
          Object.assign(loadMenuData, routess)
          // 把asyncRoutes的数据拷贝到tempAsyncRoutes里面
          const tempAsyncRoutes = Object.assign([], asyncRoutes)
          // 最最重要的，把loadMenuData追加到tempAsyncRoutes后面
          // generaMenu(tempAsyncRoutes, loadMenuData)
          creteMenu(tempAsyncRoutes, loadMenuData)
          // 定义accessedRoutes
          let accessedRoutes
          // 把 tempAsyncRoutes 的值给 accessedRoutes ，并输出
          // eslint-disable-next-line prefer-const
          accessedRoutes = tempAsyncRoutes || []
          // 下面这些就是加载目录了
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
