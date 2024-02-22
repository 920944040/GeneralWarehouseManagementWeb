import { asyncRoutes, constantRoutes } from '@/router'
import { getPermissionMenu } from '@/api/user'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
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

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(data) {
    const routes = []
    data.forEach(item => {
        const menu = {
            path: item.url,
            component: Layout,
            hidden: false,
            redirect: item.redirect,
            children: [],
            meta: item.mate,
            name: item.name
        }

        if (item.children) {
            generaMenu(item.children)
        }
        routes.push(menu)
    })
}
/**
 * 判断是否还有子级菜单
 */
// function getChildrenMenu(children) {
//     children.forEach(item => {
//         const menu = {
//             path: item.url,
//             component: Layout,
//             hidden: false,
//             redirect: item.redirect,
//             children: [],
//             meta: item.mate,
//             name: item.name
//         }

//         if (item.children) {
//             generaMenu(item.children)
//         }
//         routes.push(menu)
//     })
// }
const actions = {
    generateRoutes({ commit }, token) {
        return new Promise(resolve => {
            const loadMenuData = []

            getPermissionMenu(token).then(response => {
                const data = response.data

                Object.assign(loadMenuData, data)
                const tempAsyncRoutes = Object.assign([], asyncRoutes)

                generaMenu(data)
                accessedRoutes.push(tempAsyncRoutes)
                const accessedRoutes = tempAsyncRoutes || []
                commit('SET_ROUTES', accessedRoutes)

                resolve(accessedRoutes)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
