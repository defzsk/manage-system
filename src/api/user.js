import request from '@/utils/request'
// 获取用户登录
export const login = data => {
  // return request({
  //   method: 'POST',
  //   url: '/mp/v1_0/authorizations',
  //   // data 用来设置 POST 请求体
  //   data
  // })
  return request.post('/mp/v1_0/authorizations', data)
}
// 获取用户资料
export const getUserData = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
// 编辑用户资料
export const editUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
// 编辑头像
export const editUserAvatar = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
