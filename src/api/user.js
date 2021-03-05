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
