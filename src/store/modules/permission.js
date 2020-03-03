import { asyncRouterMap, constantRouterMap } from '@/router' // constantRouterMap默认路由 asyncRouterMap所有的与权限相关的路由

function premissionTransfer (data) { // 权限相关
  let permission = {}
  if (data.length > 0) {
    for (let i = 0, l = data.length; i < l; i++) {
      permission[data[i]] = true
 	}
  }
  return permission
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.roleName) {
    if (roles[route.roleName]) {
      return true
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap - 所有的与权限相关的路由
 * @param roles - 对应的权限 {system-config-menu：true,operator-list-add:true}(包括当前用户的所有路由和其他操作权限)
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    allRouters: constantRouterMap, // 所有路由列表 = 固定路由 + 路由权限列表 （该角色）
    permissionRouters: [], // 路由权限列表 （该角色）
    roleHasPermissions: {}, // 权限列表 路由+功能按钮 （该角色）
    role: '', // 角色
    loginName: '', // 用户名
    userName:'',
    platformName: '' // 平台名
  },
  mutations: {
    SET_ALL_ROUTERS: (state, routers) => {
      state.allRouters = constantRouterMap.concat(routers)
    },
    SET_PERMISSION_ROUTERS: (state, routers) => {
      state.permissionRouters = routers
    },
    CLEAN_PERMISSION_ROUTERS: (state) => {
      state.allRouters = constantRouterMap
      state.permissionRouters = []
    },
    SET_ROLE_HAS_PERMISSIONS: (state, permission) => {
      state.roleHasPermissions = permission
    },
    SET_LOGIN_NAME: (state, loginName) => {
      state.loginName = loginName
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
  },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_PLATFORM_NAME: (state, platformName) => {
      state.platformName = platformName
    }
  },
  actions: {
    HandlePermissions ({ commit }, data) {
      return new Promise(resolve => {
        const roles = premissionTransfer(data)
        let permissionRouters
        permissionRouters = filterAsyncRouter(asyncRouterMap, roles) // asyncRouterMap 所有权限路由列表（不区分角色）
        commit('SET_ALL_ROUTERS', permissionRouters)
        commit('SET_PERMISSION_ROUTERS', permissionRouters)
        commit('SET_ROLE_HAS_PERMISSIONS', roles)
        resolve()
      })
    },
    SetLoginName ({ commit }, loginName) {
      commit('SET_LOGIN_NAME', loginName)
    },
    SetUserName({ commit }, userName) {
      commit('SET_USER_NAME', userName)
  },
    SetRole ({commit}, role) {
      commit('SET_ROLE', role)
    },
    SetPlatformName ({commit}, platformName) {
      commit('SET_PLATFORM_NAME', platformName)
    },
    CleanPermissionRouters ({ commit }) {
      commit('CLEAN_PERMISSION_ROUTERS')
    }
  }
}

export default permission
