import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/login/LoginOn',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'api/user/GetUserByTokenAsync',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
export function getPermissionMenu(token) {
  return request({
    url: 'api/menu/GetPermissionMenuAsync',
    method: 'get',
    params: { token }
  })
}
export function getUserByPageAsync(pageIndex, pageSize) {
  return request({
    url: 'api/user/GetUserByPageAsync',
    method: 'get',
    params: { pageIndex, pageSize }
  })
}
export function getUserTypeAsync() {
  return request({
    url: 'api/user/GetUserTypeAsync',
    method: 'get'
  })
}
export function addUserAsync(data) {
  return request({
    url: 'api/user/InsertUserAsync',
    method: 'post',
    data
  })
}
