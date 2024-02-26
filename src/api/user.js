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
export function searchUserAsync(pageIndex, pageSize, userName) {
  return request({
    url: 'api/user/SearchUserAsync',
    method: 'get',
    params: { pageIndex, pageSize, userName }
  })
}
export function updateUserAsync(data) {
  return request({
    url: 'api/user/UpdateUserAsync',
    method: 'post',
    data
  })
}
export function getUserByIdAsync(id) {
  return request({
    url: 'api/user/GetUserByIdAsync',
    method: 'get',
    params: { id }
  })
}
export function resetPasswordAsync(id) {
  return request({
    url: 'api/user/ResetPasswordAsync',
    method: 'get',
    params: { id }
  })
}
